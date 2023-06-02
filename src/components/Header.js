import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import CalIcon from "public/calendarSWP.png";
import JobIcon from "public/jobsSWP.png";
import FireIcon from "public/fireSWP.png";
import LogOutIcon from "public/logoutSWP.png";

export default function Header() {
  const route = useRouter();
  const { data: session } = useSession();

  return (
    <header className="fixed left-0 top-0 flex flex-col bg-tertiary items-center justify-between h-screen w-60 py-10 px-0">
      <div className="flex flex-col items-center">
        {/* <span className="mb-5 self-end cursor-pointer">fold</span> */}
        <div className="mb-20 flex flex-col items-center">
          <Image
            src={FireIcon}
            alt="fire"
            className="h-6 w-6 mb-1"
            ></Image>
          <Link href="/" className="text-lg font-extrabold text-primary">
            취뽀달력
          </Link>
        </div>
        <nav className="space-y-3 text-base font-semibold flex flex-col items-center">
        <Link
          href="/"
          className={`text-primary tracking-wide ${
            route.pathname === "/" ? "hover:text-gray-900 bg-gray-200" : "hover:text-gray-900"
          } w-[180px]`}
          style={{
            backgroundColor: route.pathname === "/" ? "rgba(0, 0, 0, 0.1)" : "transparent",
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
          href="/jobs"
          className={`text-primary tracking-wide ${
            route.pathname === "/jobs" ? "hover:text-gray-900 bg-gray-200" : "hover:text-gray-900"
          } w-[180px]`}
          style={{
            backgroundColor: route.pathname === "/jobs" ? "rgba(0, 0, 0, 0.1)" : "transparent",
            padding: "10px 20px",
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
            transition: "background-color 0.1s",
          }}
          onMouseOver={(e) => {
            if (route.pathname !== "/jobs") {
              e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            }
          }}
          onMouseOut={(e) => {
            if (route.pathname === "/jobs") {
              e.target.style.backgroundColor = "#DBCEC7";
            } else {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          <Image
           src={JobIcon}
           alt="Icon"
           className="h-4 w-4 mr-4 ml-2"
           ></Image>
          Jobs
        </Link>

          
        </nav>
      </div>
      <div>
        {session ? (
          <div className="flex flex-col items-center">
            <div className="mb-2 justify-center">
              <div className="self-center mb-2">{session.user.name}님 환영합니다!</div>
              <div className="flex items-center justify-center">
                <Image
                  src={LogOutIcon}
                  alt="logout"
                  className="h-4 w-4 mr-2 cursor-pointer"
                  onClick={signOut}
                />
                <div className="cursor-pointer" onClick={signOut}>
                Log out
              </div>
            </div>
          </div>
        </div>
        ) : (
          <Link
            href="/login"
            className={
              route.pathname === "/login"
                ? "text-gray-700 hover:text-gray-900 font-black underline underline-offset-4"
                : "text-gray-700 hover:text-gray-900"
            }
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
