import { useRouter } from "next/router"
import { jobs } from "@/data";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Review() {
    const router = useRouter();
    const { id } = router.query;

    const [job, setJob] = useState();
    const [open, setOpen] = useState([]); 
    const [edit, setEdit] = useState([]);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
    });
    const [editData, setEditData] = useState({
        question: "",
        answer: "",
    });

    useEffect(() => {
        // 해당 페이지의 id를 가진 job을 찾아서 setJob
        const job = jobs.find((j) => j.id === Number(id));
        setJob(job);

        // open, edit 배열 초기화 (질문 답변을 보여줄지 말지, 수정할지 말지 - 각 job별로 배열을 만들어서 관리)
        setOpen(job?.reviews.map(() => false));
        setEdit(job?.reviews.map(() => false));
    }, [id]);



    return job && job.reviews && (
        <Layout>
            <h1 className="text-4xl font-extrabold text-center text-primary mb-10">{job.title}</h1>
            <p className="text-xl font-bold text-[#ABA19C] mb-10 text-right">{job.company} - {job.occupation}</p>
            <div className="flex flex-col">

                {job.reviews.map((review, index) => (
                    <div 
                    key={index} 
                    className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4 cursor-pointer"
                    onClick={() => setOpen(prevArr => {
                        const newArr = [...prevArr];
                        newArr[index] = !newArr[index];
                        return newArr;
                    })}
                    >
                        <div className="w-full flex justify-between items-center">
                            
                            {edit[index] ? (
                                <input type="text" 
                                className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4" placeholder="질문을 입력하세요"
                                value={editData.question}
                                onChange={(e) => setEditData({...editData, question: e.target.value})} />    
                            ) : (
                                <p className="text-xl font-bold text-primary">Q. {review.question}</p>
                            )}
                            
                            <div>
                                {edit[index] ? (
                                    <div className="flex ml-6">
                                        <button 
                                        className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95 mr-4"
                                        onClick={() => {
                                            setJob({
                                                ...job,
                                                reviews: job.reviews.map((r, i) => {
                                                    if (i === index) {
                                                        return editData;
                                                    } else {
                                                        return r;
                                                    }
                                                }),
                                            });
                                            setEdit(prevArr => {
                                                const newArr = [...prevArr];
                                                newArr[index] = !newArr[index];
                                                return newArr;
                                            });
                                            console.log("SETEDIT");
                                        }}
                                        >
                                            Save
                                        </button>
                                        <button 
                                        className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95"
                                        onClick={() => {
                                            setEdit(prevArr => {
                                                const newArr = [...prevArr];
                                                newArr[index] = !newArr[index];
                                                return newArr;
                                            });
                                        }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                    onClick={() => {
                                        setEditData({
                                            question: review.question,
                                            answer: review.answer,
                                        })
                                        setEdit(prevArr => {
                                            const newArr = [...prevArr];
                                            newArr[index] = !newArr[index];
                                            return newArr;
                                        });
                                    }}
                                    className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95">
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                        {(open[index] || edit[index]) && (
                            <div>
                                {edit[index] ? (
                                    <textarea rows={8} cols={35} 
                                    className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4" placeholder="답변을 입력하세요" 
                                    value={editData.answer} 
                                    onChange={(e) => setEditData({...editData, answer: e.target.value})}
                                    />
                                ) : (
                                    <p className="text-base font-bold text-[#ABA19C] my-4">A. {review.answer}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

            </div>

            <div className="my-10">
                <input type="text" 
                className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4" placeholder="질문을 입력하세요"
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})} />

                <textarea rows={8} cols={35} 
                className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4" placeholder="답변을 입력하세요" 
                value={formData.answer} 
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                />
                <button 
                className="text-lg font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mb-4 rounded-xl hover:scale-95 float-right"
                onClick={() => {
                    setJob({
                        ...job,
                        reviews: [
                            ...job.reviews,
                            formData,
                        ],
                    });
                    setFormData({
                        question: "",
                        answer: "",
                    });
                }
                }
                >
                    Add
                </button>
            </div>
        </Layout>
    )
}
