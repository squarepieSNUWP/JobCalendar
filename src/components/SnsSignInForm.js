import Image from "next/image";
import kakao from "public/kakao.png";
// import naver from "public/naver.png";
import google from "public/google.png";

export default function SnsSignInForm({ handleGoogleLogin, handleKakaoLogin }) {
  return (
    <div>
      <div className="text-center text-sm mt-4 text-gray-800">
        다른 방법으로 로그인하기
      </div>
      <div className="flex items-center mt-3 space-x-6 justify-center">
        <button
          className="bg-gray-200 inline-flex items-center justify-center h-11 w-11 rounded-full"
          onClick={handleGoogleLogin}
        >
          <Image
            src={google}
            alt="google logo"
            className="h-7 w-7 place-self-center"
          ></Image>
        </button>
        <button
          className="bg-[#F9E000] inline-flex items-center justify-center h-11 w-11 rounded-full"
          onClick={handleKakaoLogin}
        >
          <Image src={kakao} alt="kakao logo" className="h-10 w-10"></Image>
        </button>
        {/* <button
          className="bg-[#2DB400] inline-flex items-center h-11 w-11 justify-center rounded-full"
          onClick={handleNaverLogin}
        >
          <Image src={naver} alt="naver logo" className="h-11 w-11"></Image>
          
        </button> */}
      </div>
    </div>
  );
}
