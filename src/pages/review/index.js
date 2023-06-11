import { getJobs } from "@/api/job";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReviewList() {
    const router = useRouter();
    const { data: session } = useSession();

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const jobsAPI = async ( userId ) => {
            const data = await getJobs(userId);
            setJobs(data);
        }

        if(session?.user?.id) {
            jobsAPI(session.user.id);
        }
    }, [session]);



    return (
        <Layout>
            <h1 className="text-3xl place-self-start font-bold text-left mb-12 mt-2 pl-4 text-primary">Review</h1>
            {jobs.map((j, index) => (
                <div onClick={() => router.push(`/review/${j.id}`)} key={index} className="
                w-full rounded-3xl btn-hover color-1 my-3 px-8 py-6 cursor-pointer relative">
                    <svg class="h-8 w-8 mr-9 text-gray-800/90 absolute top-1/2 right-0 transform -translate-y-1/2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" 
                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <polyline points="9 6 15 12 9 18" />
                    </svg>
                    <h2 className="text-xl font-bold tracking-tight text-gray-800/90 mt-3 mb-0.5">{j.company}</h2>
                    <h3 className="text-lg font-normal text-gray-800/70">{j.title}</h3>
                </div>
            ))}
        </Layout>
    )
}