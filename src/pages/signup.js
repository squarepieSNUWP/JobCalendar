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
      <div className="flex flex-col items-center mt-16">
        <Link
          href="/"
          className="text-3xl font-bold tracking-wide text-primary/90"
        >
          Sign up
        </Link>
      </div>
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
        <div className="text-sm flex flex-col items-center font-normal text-red-600">
          {errorMsg}
        </div>
      ) : (
        <></>
      )}
      {isComplete ? (
          <div className="fixed bg-white rounded-3xl top-[40%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 
          w-1/3 h-96 flex flex-col items-center justify-center text-[#605B58] mt-24 mb- font-bold animate-pop-in">
          회원가입이 완료되었습니다!
            <div
              className="text-white rounded-3xl bg-[#C0B0A8] w-2/3 h-12 
              flex justify-center items-center cursor-pointer text-center mt-16"
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
