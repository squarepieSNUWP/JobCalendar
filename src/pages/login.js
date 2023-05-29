import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import SnsSignInForm from "@/components/SnsSignInForm";
import SignInForm from "@/components/SignInForm";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const [typingEmail, setTypingEmail] = useState("");
  const [typingPassword, setTypingPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleCredentialsLogin = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: typingEmail,
        password: typingPassword,
      });

      if (!result.error) {
        console.log("log in success");
        setErrorMsg("");
        router.replace("/");
      } else {
        setErrorMsg(result.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleKakaoLogin = () => {
    signIn("kakao");
  };

  const handleNaverLogin = () => {
    signIn("naver");
  };

  return (
    <div>
      <Link
        href="/"
        className="text-5xl flex flex-col items-center text-center font-bold text-primary mt-10"
      >
        🔥취뽀달력🔥
      </Link>
      <SignInForm
        handleCredentialsLogin={handleCredentialsLogin}
        typingEmail={typingEmail}
        setTypingEmail={setTypingEmail}
        typingPassword={typingPassword}
        setTypingPassword={setTypingPassword}
      />
      {errorMsg ? (
        <div className="flex-row text-center w-full m-auto text-sm text-gray-600">
          {errorMsg}
        </div>
      ) : (
        <></>
      )}
      <SnsSignInForm
        handleGoogleLogin={handleGoogleLogin}
        handleKakaoLogin={handleKakaoLogin}
        handleNaverLogin={handleNaverLogin}
      />
      <div className="flex-row text-center w-full m-auto text-sm mt-5 text-gray-600">
        아직 취뽀달력의 회원이 아니신가요?
        <Link href="/signup" className="underline underline-offset-1">
          회원가입
        </Link>
      </div>
    </div>
  );
}
