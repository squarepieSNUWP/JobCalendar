export default function SignUpForm({
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  registerUsername,
  setRegisterUsername,
  checkPassword,
  setCheckPassword,
  handleRegister,
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
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
    </div>
  );
}
