import Layout from "@/components/Layout";
import { jobs } from "@/data";
import { useRouter } from "next/router";

export default function ReviewList() {
    const router = useRouter();

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
                    <p>
                        <span className="text-base text-[#C5C0BE]"> {(new Date(j.endDate)).toLocaleDateString()}</span>
                    </p>
                    <h2 className="text-xl font-bold tracking-tight text-gray-800/90 mt-3 mb-0.5">{j.title}</h2>
                    <h3 className="text-lg font-normal text-gray-800/70">{j.company}</h3>
                </div>
            ))}
        </Layout>
    )
}