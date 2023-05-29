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
          className="bg-primary flex h-16 items-center px-4 py-2 font-bold w-5/12 mb-5 text-white cursor-pointer"
          onClick={handleCredentialsLogin}
        >
          로그인하기
        </div>
      </form>
    </div>
  );
}
