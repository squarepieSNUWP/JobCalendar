import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import SnsSignInForm from "@/components/SnsSignInForm";
import SignInForm from "@/components/SignInForm";
import Layout from "@/components/Layout";
import FireIcon from "public/fireSWP.png";

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
    <Layout>
      <div className="flex flex-col items-center mt-16">
        <Link href="/login" className="text-3xl font-bold tracking-wide text-primary/90">
              Log in
        </Link>
      </div>
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
      <div className="flex-row text-center w-full m-auto text-sm mt-7 text-gray-800">
        아직 취뽀달력의 회원이 아니신가요?
        <Link href="/signup" className="ml-3 underline underline-offset-1">
          회원가입
        </Link>
      </div>
    </Layout>
  );
}
