import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../../firebase/index";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  const handleRegister = async () => {
    try {
      if (registerPassword !== checkPassword) {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
        setIsComplete(false);
        return;
      }
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
      setIsComplete(true);
      setErrorMsg("");
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6자리 이상이어야 합니다.");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 주소입니다.");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다.");
          break;
      }
    }
  };

  const handleNavigation = () => {
    if (isComplete) {
      router.replace("/");
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-14">
      <Link href="/" className="text-5xl font-bold text-primary mt-14">
        🔥취뽀달력🔥
      </Link>
      <div className="flex flex-col h-96 w-5/12 mt-14 justify-between">
        <form>
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
        <div className="text-sm mt-5 font-bold text-gray-500">{errorMsg}</div>
      ) : (
        <></>
      )}
      {isComplete ? (
        <div className="flex text-gray-500 font-bold">
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
