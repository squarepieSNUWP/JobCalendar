import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const route = useRouter();
  const { data: session } = useSession();

  return (
    <header className="fixed left-0 top-0 flex flex-col bg-gray-300 items-center justify-between h-screen w-[10vw] py-10 shadow-sm">
      <div className="flex flex-col items-center">
        {/* <span className="mb-5 self-end cursor-pointer">fold</span> */}
        <div className="mb-8">
          <Link href="/" className="text-lg font-bold text-primary">
            🔥 취뽀달력 🔥
          </Link>
        </div>
        <nav className="text-lg flex flex-col">
          <Link
            href="/jobs"
            className={
              route.pathname === "/jobs"
                ? "mb-3 text-gray-700 hover:text-gray-900 font-black underline underline-offset-4"
                : "mb-3 text-gray-700 hover:text-gray-900"
            }
          >
            Jobs
          </Link>
          <Link
            href="/"
            className={
              route.pathname === "/"
                ? "text-gray-700 hover:text-gray-900 font-black underline underline-offset-4"
                : "text-gray-700 hover:text-gray-900"
            }
          >
            Calendar
          </Link>
        </nav>
      </div>
      <div>
        {session ? (
          <div className="flex">
            <div className="mr-6">{session.user.name}님 환영합니다 !</div>
            <div className="cursor-pointer" onClick={signOut}>
              Log out
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
