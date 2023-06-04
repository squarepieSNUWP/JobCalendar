import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyPage() {
    const { data: session } = useSession();

    const [tab, setTab] = useState("cv");

    if(!session && typeof window !== "undefined") {
        window.location.href = "/login";
    }

    return session && session.user && (
        <Layout>
            <h1 className="text-6xl font-extrabold text-center text-primary">My Page</h1>

            <div>
                <h2 className="text-2xl font-bold text-primary mb-3">{session.user.name}님의 활동기록</h2>
                <p className="text-xl text-primary mb-3">서류 제출 : 8회</p>
                <p className="text-xl text-primary mb-3">면접 횟수 : 8회</p>
            </div>

            <div className="flex">
                <button 
                className={`${tab === "cv" ? "bg-secondary/50" : "bg-secondary/20"} hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mr-4`}
                onClick={() => setTab("cv")}
                >
                    이력서
                </button>
                <button 
                className={`${tab === "portfolio" ? "bg-secondary/50" : "bg-secondary/20"}  hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl`}
                onClick={() => setTab("portfolio")}
                >
                    포트폴리오
                </button>
            </div>

            <div>
                {tab === "cv" ? (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center mt-10">
                            <p className="text-xl font-bold text-primary mb-3">이력서</p>
                            <p className="text-xl text-primary mb-3">최근 업데이트 : 2021.09.01</p>
                        </div>
                    </div> 
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center mt-10">
                            <p className="text-xl font-bold text-primary mb-3">포트폴리오</p>
                            <p className="text-xl text-primary mb-3">최근 업데이트 : 2021.09.01</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    ) 
}