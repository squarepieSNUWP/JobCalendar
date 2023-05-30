import Image from "next/image";
import kakao from "public/kakao.png";
import naver from "public/naver.png";
import google from "public/google.png";

export default function SnsSignInForm({
  handleGoogleLogin,
  handleKakaoLogin,
  handleNaverLogin,
}) {
  return (
    <div>
      <div className="text-center text-sm mt-5 text-gray-600">
        다른 방법으로 로그인하기
      </div>
      <div className="flex flex-col w-full items-center mt-4 h-60 justify-between">
        <button
          className="bg-[#ffffff] inline-flex h-16 items-center px-4 py-2 w-5/12 font-bold"
          onClick={handleGoogleLogin}
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
          onClick={handleKakaoLogin}
        >
          <Image src={kakao} alt="kakao logo" className="h-9 w-9 mr-4"></Image>
          카카오로 로그인하기
        </button>
        <button
          className="bg-[#2DB400] inline-flex h-16 items-center px-4 py-2 font-bold w-5/12"
          onClick={handleNaverLogin}
        >
          <Image src={naver} alt="naver logo" className="h-8 w-8 mr-4"></Image>
          네이버로 로그인하기
        </button>
      </div>
    </div>
  );
}
