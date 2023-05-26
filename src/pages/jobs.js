import Layout from "@/components/Layout";
import { jobs } from "@/data";
import Link from "next/link";
import { useState } from "react";

const PopUp = ({handleClose, job}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="relative z-50 w-11/12 p-6 mx-auto my-4 text-left bg-white rounded shadow-lg md:w-2/3">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold">{job.title}</div>
                    <button className="text-2xl font-bold text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none" onClick={handleClose}>
                        <span>×</span>
                    </button>
                </div>
                <div className="mb-12">
                    <div className="mb-2 text-xl font-bold text-primary">{job.company}</div>
                    <div className="text-lg text-gray-600 dark:text-gray-400">{job.summary}</div>
                </div>
                <div className="flex justify-end">
                    <Link href="/detail" className="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline">
                        지원하기
                    </Link>
                    <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Jobs() {
    const [isPop, setIsPop] = useState(false);
    // 팝업 안에 들어갈 job state 변수 만들어줘  ->  
    const [job, setJob] = useState(null);


    const handleClick = (j) => {
        setIsPop(true);
        setJob(j);
    }

    const handleClose = () => {
        setIsPop(false);
    }

    return (
        <Layout>
            <h1 className="text-6xl font-bold text-center text-tertiary">Jobs</h1>
            {jobs.map((j, index) => (
                <div onClick={() => handleClick(j)} key={index} className="border-b border-gray-300 dark:border-gray-700 my-4 py-4 cursor-pointer">
                    <h2 className="text-2xl font-bold text-primary mb-3">{j.title}</h2>
                    <h3 className="text-xl font-bold text-tertiary">{j.company}</h3>
                    {/* <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">{j.summary}</p> */}
                    <p>
                        <span className="text-gray-400">{(new Date(j.startDate)).toLocaleDateString()} </span> 
                        ~
                        <span className="text-gray-400"> {(new Date(j.endDate)).toLocaleDateString()}</span>
                    </p>
                </div>
            ))}
            {isPop && <PopUp handleClose={handleClose} job={job} />}
        </Layout>
    )
}