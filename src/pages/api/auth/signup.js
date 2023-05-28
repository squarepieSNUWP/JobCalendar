import { db } from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

async function handler(req, res) {
  const collectionRef = collection(db, "users_collection");

  const querySnapshot = await getDocs(collectionRef);
  const numUsers = querySnapshot.size;

  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, email, password, checkpassword } = data;

  if (!name) {
    res.status(422).json({
      message: "아이디를 입력해 주세요",
      error: true,
    });
    return;
  } else if (!email) {
    res.status(422).json({
      message: "이메일을 입력해 주세요",
      error: true,
    });
    return;
  } else if (!email.includes("@")) {
    res.status(422).json({
      message: "이메일 형식을 확인해 주세요",
      error: true,
    });
  } else if (!password) {
    res.status(422).json({
      message: "비밀번호를 입력해 주세요",
      error: true,
    });
    return;
  } else if (password.trim().length < 7) {
    res.status(422).json({
      message: "비밀번호를 7자리 이상으로 설정해 주세요",
      error: true,
    });
    return;
  } else if (password !== checkpassword) {
    res.status(422).json({
      message: "비밀번호가 일치하지 않습니다",
      error: true,
    });
    return;
  }

  const newUserRef = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const newDocRef = doc(collectionRef, `${numUsers + 1}`);
    await setDoc(newDocRef, newUserRef);
  } catch (error) {
    console.log("error while adding doc");
  }

  const userId = newUserRef.id;
  const result = { id: userId, name: name, email: email };

  if (result) {
    res.status(201).json({ message: "Created user!", error: false });
  } else {
    res.status(422).json({ message: "error occurred", error: true });
  }
}

export default handler;