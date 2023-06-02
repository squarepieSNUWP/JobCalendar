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
      <div className="flex flex-col h-96 mt-10 w-1/3 justify-between">
        <form>
        <div className="bg-tertiary rounded-3xl inline-flex h-14 items-center w-full font-bold mb-3">
          <input
            className="block bg-[#F5F2F0] w-full h-full rounded-3xl py-2 pl-7 pr-3 focus:outline-none 
            focus:border-secondary focus:ring-secondary focus:ring-2"
              id="register-username"
              value={registerUsername}
              placeholder="아이디"
              onChange={(e) => {
                const input = e.target.value;
                setRegisterUsername(input);
              }}
            />
          </div>
          <div className="bg-tertiary rounded-3xl inline-flex h-14 items-center w-full font-bold mb-3">
          <input
            className="block bg-[#F5F2F0] w-full h-full rounded-3xl py-2 pl-7 pr-3 focus:outline-none 
            focus:border-secondary focus:ring-secondary focus:ring-2"
              id="register-email"
              value={registerEmail}
              placeholder="이메일"
              onChange={(e) => {
                const input = e.target.value;
                setRegisterEmail(input);
              }}
            />
          </div>
          <div className="bg-tertiary rounded-3xl inline-flex h-14 items-center w-full font-bold mb-3">
          <input
            className="block bg-[#F5F2F0] w-full h-full rounded-3xl py-2 pl-7 pr-3 focus:outline-none 
            focus:border-secondary focus:ring-secondary focus:ring-2"
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
          <div className="bg-tertiary rounded-3xl inline-flex h-14 items-center w-full font-bold mb-3">
          <input
            className="block bg-[#F5F2F0] w-full h-full rounded-3xl py-2 pl-7 pr-3 focus:outline-none 
            focus:border-secondary focus:ring-secondary focus:ring-2"
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
            className="bg-[#C0B0A8] flex h-14 rounded-3xl items-center justify-center px-4 py-2 font-bold w-full mt-4 mb-3 
            text-white text-center cursor-pointer hover:bg-[#B4A8A1]"
            onClick={handleRegister}
          >
            회원가입
          </div>
        </form>
      </div>
    </div>
  );
}
