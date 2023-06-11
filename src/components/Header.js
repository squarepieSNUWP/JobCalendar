import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import CalIcon from "public/calendarSWP.png";
import JobIcon from "public/jobsSWP.png";
import FireIcon from "public/fireSWP.png";
import LogOutIcon from "public/logoutSWP.png";
import UserIcon from "public/user2SWP.png";
import LogInIcon from "public/loginSWP.png";
import RevIcon from "public/review2SWP.png";

export default function Header() {
  const route = useRouter();
  const { data: session } = useSession();

  return (
    <header className="fixed left-0 top-0 flex flex-col bg-tertiary items-center justify-between h-screen w-60 py-10 px-0">
      <div className="flex flex-col items-center">
        {/* <span className="mb-5 self-end cursor-pointer">fold</span> */}
        <div className="mb-10 flex flex-col items-center">
          <Link
            href="/"
            className="flex flex-col items-center justify-center 
          text-lg font-extrabold text-primary"
          >
            <Image
              href="/"
              src={FireIcon}
              alt="fire"
              className="h-5 w-5 mb-1"
            ></Image>
            취뽀달력
          </Link>
        </div>

        {/*<div className="flex flex-col bg-white rounded-3xl pt-5 pb-8 w-full">*/}
        <Link
          href={session ? "/mypage" : "/login"}
          className="flex flex-col items-center justify-center"
        >
          <Image
            href={session ? "/mypage" : "/login"}
            src={session ? session.user.image : UserIcon}
            alt="user"
            {...(session
              ? { width: 1000, height: 1000, style: { borderRadius: "50%" } }
              : {})}
            className="h-20 w-20 mb-1.5"
          />
        </Link>
        <div>
          {session ? (
            <Link href="/mypage">
              <div className="flex flex-col items-center">
                <div className="place-self-center mb-1 mt-2">
                  {session.user.name}님 환영합니다!
                </div>

              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center">
              <Link
                href="/login"
                className={`place-self-center ${
                  route.pathname === "/login"
                    ? "text-gray-800 hover:text-gray-900"
                    : "cursor-pointer text-gray-700 hover:text-gray-900 "
                }
                    `}
              >
                로그인이 필요합니다
              </Link>
            </div>
          )}
        </div>
        {/*</div>*/}

        <nav className="space-y-4 mt-24 text-base font-semibold flex flex-col items-center">
          <Link
            href="/"
            className={`text-primary tracking-wide ${
              route.pathname === "/"
                ? "hover:text-gray-900 bg-gray-200"
                : "hover:text-gray-900"
            } w-[180px]`}
            style={{
              backgroundColor:
                route.pathname === "/" ? "rgba(0, 0, 0, 0.1)" : "transparent",
              padding: "10px 20px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              transition: "background-color 0.1s",
            }}
            onMouseOver={(e) => {
              if (route.pathname !== "/") {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (route.pathname === "/") {
                e.target.style.backgroundColor = "#DBCEC7";
              } else {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            <Image
              src={CalIcon}
              alt="Icon"
              className="h-4 w-4 mr-4 ml-2"
            ></Image>
            Calendar
          </Link>

          <Link
            href="/mypage"
            className={`text-primary tracking-wide ${
              route.pathname === "/mypage"
                ? "hover:text-gray-900 bg-gray-200"
                : "hover:text-gray-900"
            } w-[180px]`}
            style={{
              backgroundColor:
                route.pathname === "/mypage"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "transparent",
              padding: "10px 20px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              transition: "background-color 0.1s",
            }}
            onMouseOver={(e) => {
              if (route.pathname !== "/mypage") {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (route.pathname === "/mypage") {
                e.target.style.backgroundColor = "#DBCEC7";
              } else {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            <Image
              src={JobIcon}
              alt="Icon"
              className="h-5 w-5 mr-4 ml-1"
            ></Image>
            Documents
          </Link>

          <Link
            href="/review"
            className={`text-primary tracking-wide ${
              route.pathname === "/review"
                ? "hover:text-gray-900 bg-gray-200"
                : "hover:text-gray-900"
            } w-[180px]`}
            style={{
              backgroundColor:
                route.pathname === "/review"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "transparent",
              padding: "10px 20px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              transition: "background-color 0.1s",
            }}
            onMouseOver={(e) => {
              if (route.pathname !== "/review") {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (route.pathname === "/review") {
                e.target.style.backgroundColor = "#DBCEC7";
              } else {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            <Image
              src={RevIcon}
              alt="Icon"
              className="h-4 w-4 mr-4 ml-2"
            ></Image>
            Review
          </Link>
        </nav>
      </div>
      <div>
        {session ? (
          <div className="flex flex-col items-center">
            <div className="mb-1 justify-center">
              <div
                className="cursor-pointer bg-tertiary rounded-3xl hover:shadow-inner w-28 h-11 flex items-center justify-center"
                onClick={signOut}
              >
                <Image
                  src={LogOutIcon}
                  alt="logout"
                  className="h-6 w-6 mr-2 cursor-pointer"
                  onClick={signOut}
                />
                <div
                  className="cursor-pointer text-gray-700 hover:text-gray-900 font-semibold mb-0.5"
                  onClick={signOut}
                >
                  Log out
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mb-1 justify-center">
              <div className="cursor-pointer bg-tertiary rounded-3xl hover:shadow-inner w-28 h-11 flex items-center justify-center">
                <Image
                  src={LogInIcon}
                  alt="Log in"
                  className="h-6 w-6 mr-2"
                ></Image>
                <Link
                  href="/login"
                  className={
                    route.pathname === "/login"
                      ? "cursor-pointer text-gray-900 hover:text-gray-900 font-semibold mb-0.5"
                      : "cursor-pointer text-gray-700 hover:text-gray-900 font-semibold mb-0.5"
                  }
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
