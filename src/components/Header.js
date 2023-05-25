import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
    const route = useRouter();

    return (
        <header className="flex items-center justify-between h-24 px-12 py-5 bg-white shadow-sm">
            <div className="flex items-center">
                <div className="mr-6">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        🔥 취뽀달력 🔥
                    </Link>
                </div>
                <nav className="text-lg">
                    <Link href="/jobs" className={route.pathname === "/jobs" ? "mr-4 text-gray-700 hover:text-gray-900 font-black underline underline-offset-4" : "mr-4 text-gray-700 hover:text-gray-900"}>
                        Jobs
                    </Link>
                    <Link href="/" className={route.pathname === "/" ? "mr-4 text-gray-700 hover:text-gray-900 font-black underline underline-offset-4" : "mr-4 text-gray-700 hover:text-gray-900"}>
                        Calendar
                    </Link>
                </nav>
            </div>
            <div>
                <Link href="/login" className="mr-4 text-gray-700 hover:text-gray-900">
                    Login
                </Link>
            </div>
        </header>
    )
}