import Layout from "@/components/Layout";
import { jobs } from "@/data";
import { useRouter } from "next/router";

export default function ReviewList() {
    const router = useRouter();

    return (
        <Layout>
            <h1 className="text-6xl font-extrabold text-center text-primary">Review</h1>
            {jobs.map((j, index) => (
                <div onClick={() => router.push(`/review/${j.id}`)} key={index} className="border-b border-gray-300 dark:border-gray-700 my-4 py-4 cursor-pointer">
                    <h2 className="text-2xl font-bold text-primary mb-3">{j.title}</h2>
                    <h3 className="text-xl font-bold text-[#ABA19C]">{j.company}</h3>
                    <p>
                        <span className="text-gray-400"> {(new Date(j.endDate)).toLocaleDateString()}</span>
                    </p>
                </div>
            ))}
        </Layout>
    )
}