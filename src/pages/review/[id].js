import { useRouter } from "next/router"
import { jobs, ratings } from "@/data";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Review() {
    const router = useRouter();
    const { id } = router.query;

    const [job, setJob] = useState(null);
    const [open, setOpen] = useState([]); 
    const [edit, setEdit] = useState([]);
    const [newTag, setNewTag] = useState(""); // 새로 생성하고 싶은 태그 이름
    const [tagTotal, setTagTotal] = useState([]);
    const [appliedTags, setAppliedTags] = useState([]);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        tags: [],
    });
    const [editData, setEditData] = useState({
        question: "",
        answer: "",
    });
    const [generalData, setGeneralData] = useState({
        generalReview: "",
        generalRating: null,
    });
    const [appliedRating, setAppliedRating] = useState(null); 

    const [showCreateReview, setShowCreateReview] = useState(false);
    const [showCreateGeneralReview, setShowCreateGeneralReview] = useState(false);

    useEffect(() => {
        // 해당 페이지의 id를 가진 job을 찾아서 setJob
        const job = jobs.find((j) => j.id === Number(id));
        setJob(job);
    }, [id]);

    useEffect(() => {
        if(!job) return;

        const tags = job.reviews.reduce((acc, review) => {
            for (let tag of review.tags) {
                acc.add(tag);
            }
              return acc;
        }, new Set());
        setTagTotal(Array.from(tags));

        // open, edit 배열 초기화 (질문 답변을 보여줄지 말지, 수정할지 말지 - 각 job별로 배열을 만들어서 관리)
        setOpen(job.reviews.map(() => false));
        setEdit(job.reviews.map(() => false));
    }, [job])

    const applyTag = (tag) => {
        appliedTags.includes(tag) ? setAppliedTags(appliedTags.filter((t) => t !== tag)) : setAppliedTags([...appliedTags, tag]);
    }


    return job && job.reviews && (
        <Layout>
            <h1 className="text-4xl font-extrabold text-center text-primary mb-10">{job.title}</h1>
            <p className="text-xl font-bold text-[#ABA19C] mb-10 text-right">{job.company} - {job.occupation}</p>

            <div className="border-2 border-primary px-6 py-8 mb-6 rounded-2xl">
                <p className="text-xl font-bold text-primary mb-4">총평</p>
                {job.generalReview.length > 0 && job.generalRating ? (
                    <>
                        <p className="text-xl font-bold text-[#ABA19C] mb-4">{job.generalReview}</p>
                        <span 
                            className="px-4 py-3 text-sm rounded-2xl text-white font-bold mx-2"
                            style={{
                                backgroundColor: job.generalRating.color,
                            }}
                        >#{job.generalRating.title}</span>
                    </>
                ) : (
                    <p className="text-xl font-bold text-[#ABA19C] mb-4">총평을 작성해주세요</p>
                )}
            </div>

            <div className="flex flex-col">
                {job.reviews.length > 0 ? (
                        <>
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
                                                <>
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
                                                    className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mr-4 rounded-xl hover:scale-95">
                                                        수정
                                                    </button>

                                                    <button
                                                    onClick={() => {
                                                        const ok = confirm("정말로 삭제하시겠습니까?");
                                                        if(ok) {
                                                            setJob({
                                                                ...job,
                                                                reviews: job.reviews.filter((r, i) => i !== index),
                                                            });
                                                        }
                                                    }}
                                                    className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95">
                                                        삭제
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex mt-2 items-center">
                                        <div>
                                            {review.tags.map((tag, _) => (
                                                <button key={tag.id} className="mr-2 px-4 py-2 text-sm rounded-2xl text-white font-bold" style={{
                                                    backgroundColor: tag.color,
                                                }}>#{tag.title}</button>
                                            ))}
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
                        </>
                    ) : (
                        <p className="text-xl font-bold text-[#ABA19C] mb-4">회고를 작성해주세요</p>
                    )}

            </div>

            <div className="border-2 border-primary p-4 mb-6 mt-24 rounded-2xl flex flex-col">
                <button 
                className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mb-4 rounded-xl hover:scale-95 self-end"
                onClick={() => setShowCreateReview(!showCreateReview)}
                >
                    {showCreateReview ? "취소" : "회고 작성하기"}
                </button>
                {showCreateReview && (
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

                        <div className="flex items-center mb-4">
                            <input type="text"
                            className="w-1/2 border-2 border-primary px-8 py-4 rounded-xl mr-12" placeholder="새로 생성하고 싶은 태그 이름을 입력하세요"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            />
                            <button
                            className="text-sm font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-4 rounded-xl hover:scale-95"
                            onClick={() => {
                                setTagTotal([
                                    ...tagTotal,
                                    {
                                        id: tagTotal.length + 1,
                                        title: newTag,
                                        color: `rgba(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256},0.7)`,
                                    }
                                ]);
                                setNewTag("");
                            }}
                            >
                            태그 생성하기 </button>
                        </div>

                        <div className="flex">
                            {tagTotal.map((tag, _) => (
                                <div key={tag.id} 
                                className={`px-4 py-2 text-sm rounded-2xl text-white font-bold ${appliedTags.includes(tag) ? "opacity-100 scale-[1.2]" : "opacity-40 scale-100"} mx-2  cursor-pointer hover:opacity-100`} 
                                style={{
                                    backgroundColor: tag.color,
                                }}
                                onClick={() => applyTag(tag)}
                                >#{tag.title}</div>
                            ))}
                        </div>
                        <button 
                        className="text-lg font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mb-4 rounded-xl hover:scale-95 float-right"
                        onClick={() => {
                            setJob({
                                ...job,
                                reviews: [
                                    ...job.reviews,
                                    {
                                        ...formData,
                                        tags: appliedTags,
                                    },
                                ],
                            });
                            setFormData({
                                question: "",
                                answer: "",
                                tags: [],
                            });
                            setAppliedTags([]);
                            setShowCreateReview(false);
                        }
                        }
                        >
                            Add
                        </button>
                    </div>   
                )} 
            </div>

            <div className="border-2 border-primary p-4 rounded-2xl flex flex-col">
                <button
                className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mb-4 rounded-xl hover:scale-95 self-end"
                onClick={() => setShowCreateGeneralReview(!showCreateGeneralReview)}
                >
                    {showCreateGeneralReview ? "취소" : "총평 작성하기"}
                </button>
                {showCreateGeneralReview && (
                    <div className="my-10">
                        <textarea rows={8} cols={35} 
                        className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4" placeholder="총평을 입력하세요" 
                        value={generalData.generalReview} 
                        onChange={(e) => setGeneralData({...generalData, generalReview: e.target.value})}
                        />

                        <div className="flex">
                            {ratings.map((rating, _) => (
                                <div key={rating.id} 
                                className={`px-4 py-2 text-sm rounded-2xl text-white font-bold ${appliedRating && appliedRating.title === rating.title ? "opacity-100 scale-[1.2]" : "opacity-40 scale-100"} mx-2  cursor-pointer hover:opacity-100`} 
                                style={{
                                    backgroundColor: rating.color,
                                }}
                                onClick={() => setAppliedRating(rating)}
                                >#{rating.title}</div>
                            ))}
                        </div>
                        <button 
                        className="text-lg font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mb-4 rounded-xl hover:scale-95 float-right"
                        onClick={() => {
                            setJob({
                                ...job,
                                generalReview: generalData.generalReview,
                                generalRating: appliedRating,
                            });
                            setGeneralData({
                                generalReview: "",
                                generalRating: null,
                            });
                            setAppliedRating(null);
                            setShowCreateGeneralReview(false);
                        }}
                        >
                            Add
                        </button>
                    </div>   
                )}
            </div>
        </Layout>
    )
}
