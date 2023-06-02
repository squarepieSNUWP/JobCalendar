export default function SignInForm({
  handleCredentialsLogin,
  typingEmail,
  setTypingEmail,
  typingPassword,
  setTypingPassword,
}) {
  return (
    <div>
      <form className="w-full pt-10 flex flex-col justify-between items-center">
        <div className="bg-tertiary rounded-3xl inline-flex h-14 items-center w-1/3 font-bold mb-4">
          <input
            className="block bg-[#F5F2F0] w-full h-full rounded-3xl py-2 pl-7 pr-3 focus:outline-none 
            focus:border-secondary focus:ring-secondary focus:ring-2"
            id="email"
            value={typingEmail}
            placeholder="이메일"
            onChange={(e) => {
              const input = e.target.value;
              setTypingEmail(input);
            }}
          />
        </div>
        <div className="bg-tertiary rounded-3xl inline-flex h-14 items-center w-1/3 font-bold mb-4">
          <input
            className="block bg-[#F5F2F0] w-full h-full rounded-3xl py-2 pl-7 pr-3 focus:outline-none 
            focus:border-secondary focus:ring-secondary focus:ring-2"
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
          className="bg-[#C0B0A8] flex h-14 rounded-3xl items-center justify-center px-4 py-2 font-bold w-1/3 mt-4 mb-3 
          text-white text-center cursor-pointer hover:bg-[#B4A8A1]"
          onClick={handleCredentialsLogin}
        >
          로그인하기
        </div>
      </form>
    </div>
  );
}
