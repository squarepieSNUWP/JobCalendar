import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SignUpForm from "@/components/SignUpForm";
import Layout from "@/components/Layout";

export default function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const router = useRouter();

  const createUser = async (name, email, password, checkpassword) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, checkpassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message);
      }
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNavigation = () => {
    if (isComplete) {
      router.replace("/");
    }
  };

  const handleRegister = async () => {
    try {
      const result = await createUser(
        registerUsername,
        registerEmail,
        registerPassword,
        checkPassword
      );
      if (!result.error) {
        setIsComplete(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [isComplete]);

  return (
    <Layout>
      <Link
        href="/"
        className="flex flex-col items-center text-5xl font-bold text-primary mt-14"
      >
        🔥취뽀달력🔥
      </Link>
      <SignUpForm
        registerEmail={registerEmail}
        setRegisterEmail={setRegisterEmail}
        registerPassword={registerPassword}
        setRegisterPassword={setRegisterPassword}
        registerUsername={registerUsername}
        setRegisterUsername={setRegisterUsername}
        checkPassword={checkPassword}
        setCheckPassword={setCheckPassword}
        handleRegister={handleRegister}
      />
      {errorMsg ? (
        <div className="text-sm flex flex-col items-center mt-10 font-bold text-gray-500">
          {errorMsg}
        </div>
      ) : (
        <></>
      )}
      {isComplete ? (
        <div className="flex flex-col items-center text-gray-500 mt-10 font-bold">
          회원가입이 완료되었습니다!{" "}
          <div
            className="ml-2 underline underline-offset-1 cursor-pointer"
            onClick={handleNavigation}
          >
            로그인하러 가기
          </div>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
}
