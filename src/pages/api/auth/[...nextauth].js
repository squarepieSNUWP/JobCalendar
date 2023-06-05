import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

async function getUserByEmail(email) {
  const collectionRef = collection(db, "users_collection");
  const q = query(collectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }
  const userData = querySnapshot.docs[0].data();
  return userData;
}

async function saveUserToFirebase(user) {
  // console.log("save user");
  const collectionRef = collection(db, "users_collection");

  const querySnapshot = await getDocs(collectionRef);
  const numUsers = querySnapshot.size;

  const q = query(collectionRef, where("id", "==", user.id));
  const querySnap = await getDocs(q);

  if (!querySnap.empty) {
    return;
  }

  const newDocRef = doc(collectionRef, `${numUsers + 1}`);
  await setDoc(newDocRef, {
    id: user.id,
    name: user.name,
  });
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("가입되지 않은 유저입니다");
        } else if (user.password !== password) {
          throw new Error("비밀번호를 확인해 주세요");
        }

        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn(user) {
      const { id, name, email } = user.user;
      // console.log(user.user);
      await saveUserToFirebase({ id, email, name });
      return true;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
});
