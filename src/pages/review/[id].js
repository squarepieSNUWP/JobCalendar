import { useRouter } from "next/router"
import { jobs, ratings } from "@/data";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from 'next/link';

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
            <div className="bg-gradient-to-r from-[#f5eeebe7] to-[#e1d6d1] px-5 py-8 mb-6 rounded-3xl relative">
                <Link href="/review">
                    <svg class="h-8 w-8 mr-9 text-gray-800/90 absolute
                        top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"  
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </Link>
    
                <h1 className="text-2xl font-bold mb-2 text-left pl-4 text-primary tracking-tight">{job.title}</h1>
                <p className="text-xl font-base text-gray-600/90 pl-4 tracking-tight text-left">{job.company} - {job.occupation}</p>

            </div>
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

            <div className="flex flex-col bg-white px-2 pt-6">
                <p className="text-xl font-semibold text-primary mb-4 border-0 border-b-2 pb-1.5">Interview</p>
                {job.reviews.length > 0 ? (
                        <>
                            {job.reviews.map((review, index) => (
                                <div 
                                key={index} 
                                className="w-full px-4 py-4 rounded-3xl mb-4 cursor-pointer hover:shadow"
                                onClick={() => setOpen(prevArr => {
                                    const newArr = [...prevArr];
                                    newArr[index] = !newArr[index];
                                    return newArr;
                                })}
                                >
                                    <div className="w-full flex justify-between px-3 py-1 items-center">
                                        
                                        {edit[index] ? (
                                            <input type="text" 
                                            className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4" placeholder="질문을 입력하세요"
                                            value={editData.question}
                                            onChange={(e) => setEditData({...editData, question: e.target.value})} />    
                                        ) : (
                                            <p className="text-lg font-bold text-primary">Q. {review.question}</p>
                                        )}
                                        
                                        <div className="flex">
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
                                                    <svg class="h-6 w-6 text-gray-700 mr-4 hover:scale-[80%]"  
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
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                                    </svg>
                                                
                                                    
                                                    <svg class="h-6 w-6 text-gray-700 hover:scale-[80%]"  
                                                     onClick={() => {
                                                        const ok = confirm("정말로 삭제하시겠습니까?");
                                                        if(ok) {
                                                            setJob({
                                                                ...job,
                                                                reviews: job.reviews.filter((r, i) => i !== index),
                                                            });
                                                        }
                                                    }}
                                                    viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />
                                                    </svg>
                                                </>
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
                                                <p className="text-base font-bold text-[#ABA19C] pl-5 my-2">A. {review.answer}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex mt-1 mb-2 items-center">
                                        <div>
                                            {review.tags.map((tag, _) => (
                                                <button key={tag.id} className="ml-3 px-3 py-1 text-sm rounded-3xl text-white font-base" style={{
                                                    backgroundColor: tag.color,
                                                }}>#{tag.title}</button>
                                            ))}
                                        </div>
                                    </div>
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
