import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div className="w-full flex flex-col items-center mt-4">
      <Link href="/" className="text-5xl font-bold text-primary mt-14">
        🔥취뽀달력🔥
      </Link>
      <div className="flex flex-col h-96 w-5/12 mt-14 justify-between">
        <form>
          <div className="h-16 px-4 py-2 font-bold border-solid border-2 mb-4">
            <input
              className="bg-gray-100 w-full h-full"
              id="register-username"
              value={registerUsername}
              placeholder="아이디"
              onChange={(e) => {
                const input = e.target.value;
                setRegisterUsername(input);
              }}
            />
          </div>
          <div className="h-16 px-4 py-2 font-bold border-solid border-2 mb-4">
            <input
              className="bg-gray-100 w-full h-full"
              id="register-email"
              value={registerEmail}
              placeholder="이메일"
              onChange={(e) => {
                const input = e.target.value;
                setRegisterEmail(input);
              }}
            />
          </div>
          <div className="h-16 px-4 py-2 font-bold border-solid border-2 mb-4">
            <input
              className="bg-gray-100 w-full h-full"
              id="register-password"
              value={registerPassword}
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                const input = e.target.value;
                setRegisterPassword(input);
              }}
            />
          </div>
          <div className="h-16 px-4 py-2 font-bold border-solid border-2 mb-10">
            <input
              className="bg-gray-100 w-full h-full"
              id="password-check"
              value={checkPassword}
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => {
                const input = e.target.value;
                setCheckPassword(input);
              }}
            />
          </div>
          <div
            className="bg-primary inline-flex items-center h-16 px-4 py-2 font-bold w-full text-white cursor-pointer"
            onClick={handleRegister}
          >
            회원가입
          </div>
        </form>
      </div>
      {errorMsg ? (
        <div className="text-sm mt-10 font-bold text-gray-500">{errorMsg}</div>
      ) : (
        <></>
      )}
      {isComplete ? (
        <div className="flex text-gray-500 mt-10 font-bold">
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
    </div>
  );
}
