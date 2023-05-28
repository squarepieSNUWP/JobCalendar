import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import google from "public/google.png";
import { auth, signInWithEmailAndPassword } from "../../../firebase/index";
import kakao from "public/kakao.png";
import naver from "public/naver.png";

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();

  const [isAppropriate, setIsAppropriate] = useState(true);
  const [logInUser, setLogInUser] = useState(null);
  const [typingEmail, setTypingEmail] = useState("");
  const [typingPassword, setTypingPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  //TODO - nextauth credentials로 구현 | 세션 조작 방식 찾기
  const handleLogin = async () => {
    try {
      const userInfo = await signInWithEmailAndPassword(
        auth,
        typingEmail,
        typingPassword
      );
      setLogInUser(userInfo);
    } catch (error) {
      setIsAppropriate(false);
      console.log(error.code);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <Link href="/" className="text-5xl font-bold text-primary mt-10">
        🔥취뽀달력🔥
      </Link>
      <form className="w-full pt-10 flex flex-col justify-between items-center">
        <div className="bg-gray-100 inline-flex h-16 items-center px-4 py-2 font-bold border-solid border-2 w-5/12 mb-4">
          <input
            className="bg-gray-100"
            id="email"
            value={typingEmail}
            placeholder="이메일"
            onChange={(e) => {
              const input = e.target.value;
              setTypingEmail(input);
            }}
          />
        </div>
        <div className="bg-gray-100 inline-flex h-16 border-solid border-2 items-center px-4 py-2 font-bold w-5/12 mb-4">
          <input
            className="bg-gray-100"
            id="password"
            value={typingPassword}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => {
              const input = e.target.value;
              setTypingPassword(input);
            }}
          />
        </div>
        <div
          className="bg-primary flex h-16 pl-64 items-center px-4 py-2 font-bold w-5/12 mb-5 text-white cursor-pointer"
          onClick={handleLogin}
        >
          로그인하기
        </div>
      </form>
      <div className="text-sm mt-5 text-gray-600">다른 방법으로 로그인하기</div>
      <div className="flex flex-col w-full items-center mt-4 h-60 justify-between">
        <button
          className="bg-[#ffffff] inline-flex h-16 items-center px-4 py-2 w-5/12 font-bold"
          onClick={() => signIn("google")}
        >
          <Image
            src={google}
            alt="google logo"
            className="h-8 w-8 mr-5"
          ></Image>
          구글로 로그인하기
        </button>
        <button
          className="bg-[#F9E000] inline-flex h-16 items-center px-4 py-2 font-bold w-5/12"
          onClick={() => signIn("kakao")}
        >
          <Image src={kakao} alt="kakao logo" className="h-9 w-9 mr-4"></Image>
          카카오로 로그인하기
        </button>
        <button className="bg-[#2DB400] inline-flex h-16 items-center px-4 py-2 font-bold w-5/12">
          <Image src={naver} alt="naver logo" className="h-8 w-8 mr-4"></Image>
          네이버로 로그인하기
        </button>
      </div>
      <div className="flex-row text-center w-full m-auto text-sm mt-5 text-gray-600">
        아직 취뽀달력의 회원이 아니신가요?
        <Link href="/signup" className="underline underline-offset-1">
          회원가입
        </Link>
      </div>
    </div>
  );
}
