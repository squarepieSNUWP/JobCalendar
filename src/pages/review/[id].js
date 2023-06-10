import { useRouter } from "next/router";
import { jobs, ratings } from "@/data";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import Quo1Icon from "public/quote1SWP.png";
import Quo2Icon from "public/quote2SWP.png";
// import { addTag, getTags } from "../api/api";
import { createTag, getMyTags, deleteTag, getTags } from "@/api/tag";
import { useSession } from "next-auth/react";
import { createReview, getReviews, updateReview } from "@/api/review";
import { getJob } from "@/api/job";

export default function Review() {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);

  const [job, setJob] = useState(null);
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
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
    overall: "",
    rating: null,
  });
  const [appliedRating, setAppliedRating] = useState(null);

  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showCreateGeneralReview, setShowCreateGeneralReview] = useState(false);

  useEffect(() => {
    // job & reviews 세팅 
    const getJobAPI = async (jobId) => {
      const job = await getJob(jobId);
      setJob(job);
    }

    const getReviewAPI = async (jobId) => {
      const reviewData = await getReviews(jobId);
      let reviews = [];
      for(const r of reviewData) {
        const tags = await getTags(r.id);
        reviews.push({...r, tags: tags});
      }
      setReviews(reviews);
    }
    if(id) {
      getReviewAPI(id)
      getJobAPI(id)
    };
  }, [id]);

  const createTagHandler = async () => {
    const color = `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${
      Math.random() * 256
    }, 0.7)`;

    try {
      const newTagData = {
        title: newTag,
        color: color,
        userId: userId,
      };

      const docRef = await createTag(newTagData);

      setTagTotal([
        ...tagTotal,
        {
          id: docRef.id,
          title: newTag,
          color: color,
        },
      ]);

      setNewTag("");
    } catch (error) {
      console.error("Error creating tag:", error.message);
    }
  };

  const deleteTagHandler = () => {
    const tagIds = appliedTags.map((tag) => tag.id);
    deleteTag(tagIds);
    const updatedTagTotal = tagTotal.filter((tag) => !tagIds.includes(tag.id));
    setTagTotal(updatedTagTotal);
  };

  useEffect(() => {
    if (reviews.length <= 0) return;

    // open, edit 배열 초기화 (질문 답변을 보여줄지 말지, 수정할지 말지 - 각 job별로 배열을 만들어서 관리)
    setOpen(reviews.map(() => false));
    setEdit(reviews.map(() => false));
  }, [reviews]);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    } else console.log("no session");
  }, [userId, session]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (userId) {
          const tags = await getMyTags(userId);
          setTagTotal(tags);
        }
      } catch (error) {
        console.log("태그를 가져올 수 없습니다:", error.message);
      }
    };

    fetchTags();
  }, [userId]);

  const applyTag = (tag) => {
    appliedTags.includes(tag)
      ? setAppliedTags(appliedTags.filter((t) => t !== tag))
      : setAppliedTags([...appliedTags, tag]);
  };

  return (
    reviews.length > 0 && (
      <Layout>
        <div className="bg-gradient-to-r from-[#f5eeebe7] to-[#e1d6d1] px-5 py-8 mb-6 rounded-3xl relative">
          <Link href="/review">
            <svg
              class="h-8 w-8 mr-9 text-gray-800/90 absolute
                        top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>

          <h1 className="text-2xl font-bold mb-2 text-left pl-4 text-primary tracking-tight">
            {job.title}
          </h1>
          <p className="text-xl font-base text-gray-600/90 pl-4 tracking-tight text-left">
            {job.company}
          </p>
        </div>

        {/* 총평 부분*/}
        <div className="flex ml-2 pr-2 justify-between">
          <p className="text-xl font-semibold mt-3 text-primary">Evaluation</p>
          <a
            onClick={() => setShowCreateGeneralReview(!showCreateGeneralReview)}
            class="button2 cursor-pointer pr-4 mt-3"
          >
            <span class="icon bg-[#d4b5a7] font-normal ">+</span>
            {showCreateGeneralReview ? "취소" : "총평 작성"}
          </a>
        </div>

        <div className="p-1 ml-1 mr-1 rounded-2xl flex flex-col">
          {showCreateGeneralReview && (
            <div className="my-1">
              <textarea
                rows={8}
                cols={35}
                className="w-full border-2 border-gray-300 px-6 py-4 rounded-3xl mb-3
                        focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                placeholder="총평을 입력하세요"
                value={generalData.overall}
                onChange={(e) =>
                  setGeneralData({
                    ...generalData,
                    overall: e.target.value,
                  })
                }
              />

              <div className="flex">
                {ratings.map((rating, _) => (
                  <div
                    key={rating.id}
                    className={`px-3 py-2 text-sm rounded-3xl text-white font-base ${
                      appliedRating && appliedRating.title === rating.title
                        ? "opacity-100 scale-[1.2]"
                        : "opacity-40 scale-100"
                    } mx-2  cursor-pointer hover:opacity-100`}
                    style={{
                      backgroundColor: rating.color,
                    }}
                    onClick={() => setAppliedRating(rating)}
                  >
                    #{rating.title}
                  </div>
                ))}
              </div>
              <div className="flex mt-3 mb-4 justify-end">
                <button
                  className="text-lg font-semibold text-primary bg-tertiary hover:text-[#ABA19C] 
                            hover:bg-primary px-4 py-1.5 mb-4 mr-2 rounded-3xl hover:scale-95 float-right"
                  onClick={() => {
                    setJob({
                      ...job,
                      overall: generalData.overall,
                      rating: appliedRating,
                    });
                    setGeneralData({
                      overall: "",
                      rating: null,
                    });
                    setAppliedRating(null);
                    setShowCreateGeneralReview(false);
                  }}
                >
                  Add
                </button>

                <button
                  class="text-lg font-semibold text-primary bg-tertiary hover:text-[#ABA19C] 
                            hover:bg-primary px-4 py-1.5 mb-4 rounded-3xl hover:scale-95 float-right"
                  onClick={() =>
                    setShowCreateGeneralReview(!showCreateGeneralReview)
                  }
                >
                  {showCreateGeneralReview ? "Cancel" : ""}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex ml-20 mr-24 px-3 py-3 rounded-2xl justify-center">
          <Image
            src={Quo1Icon}
            alt="Icon"
            className="h-7 w-7 mb-1 mr-8"
          ></Image>

          <div className="flex flex-col">
            {job && job.overall.length > 0 && job.rating ? (
              <>
                <p className="text-xl font-bold text-[#CEB5A8] text-center">
                  {job.overall}
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-[#ABA19C] mb-4">
                총평을 작성해주세요
              </p>
            )}
          </div>

          <Image
            src={Quo2Icon}
            alt="icon"
            className="h-7 w-7 mb-1 ml-8"
          ></Image>
        </div>
        <div className="flex justify-center">
          <span
            className="px-3 py-1.5 text-sm rounded-3xl 
                    text-white font-base mx-2"
            style={{
              backgroundColor: job?.rating.color,
            }}
          >
            #{job?.rating.title}
          </span>
        </div>

        {/* 면접 부분*/}

        <div className="flex ml-2 pr-2 justify-between">
          <p className="text-xl font-semibold mt-3 text-primary">Interview</p>
          <a
            onClick={() => setShowCreateReview(!showCreateReview)}
            class="button2 cursor-pointer pr-4 mt-3"
          >
            <span class="icon font-normal ">+</span>
            {showCreateReview ? "취소" : "추가하기"}
          </a>
        </div>

        <div className="p-1 ml-1 mr-1 rounded-2xl flex flex-col">
          {showCreateReview && (
            <div className="px-6 rounded-3xl">
              <input
                type="text"
                className="w-full border-2 border-gray-300 px-6 py-3 rounded-3xl mt-2
                        focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                placeholder="질문을 입력하세요"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
              />

              <textarea
                rows={8}
                cols={35}
                className="w-full border-2 border-gray-300 px-6 py-4 rounded-3xl mt-3 mb-4
                        focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                placeholder="답변을 입력하세요"
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
              />

              <div className="flex items-center">
                <input
                  type="text"
                  className="w-1/2 border-2 mr-5 border-gray-300 px-6 py-2 rounded-3xl mt-3 mb-4
                            focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                  placeholder="새로 생성하고 싶은 태그 이름을 입력하세요"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  className="text-sm font-bold text-gray-800/80 bg-tertiary hover:bg-primary px-4 py-2 mt-3 mb-4 rounded-3xl hover:scale-95"
                  onClick={createTagHandler}
                >
                  태그 생성{" "}
                </button>
                <button
                  className="text-sm font-bold text-gray-800/80 bg-tertiary hover:bg-primary px-4 py-2 mt-3 mb-4 rounded-3xl hover:scale-95"
                  onClick={deleteTagHandler}
                >
                  태그 삭제{" "}
                </button>
              </div>

              <div className="flex">
                {tagTotal.map((tag, _) => (
                  <div
                    key={tag.id}
                    className={`px-3 py-1 text-sm rounded-3xl text-white font-base ${
                      appliedTags.includes(tag)
                        ? "opacity-100 scale-[1.2]"
                        : "opacity-40 scale-100"
                    } mx-1  cursor-pointer hover:opacity-100`}
                    style={{
                      backgroundColor: tag.color,
                    }}
                    onClick={() => applyTag(tag)}
                  >
                    #{tag.title}
                  </div>
                ))}
              </div>
              <div className="flex mt-3 mb-1 justify-end">
                <button
                  className="text-lg font-semibold text-primary bg-tertiary hover:text-[#ABA19C] 
                            hover:bg-primary px-4 py-1.5 mb-4 mr-2 rounded-3xl hover:scale-95 float-right"
                  onClick={async () => {
                    setReviews([
                        ...reviews,
                        {
                          ...formData,
                          tags: appliedTags.map((tag) => tag.id),
                        },
                      ]
                    );

                    await createReview( {...formData, jobId: id, tags: appliedTags.map((tag) => tag.id) });

                    setFormData({
                      question: "",
                      answer: "",
                      tags: [],
                    });
                    setAppliedTags([]);
                    setShowCreateReview(false);

                  }}
                >
                  Add
                </button>

                <button
                  class="text-lg font-semibold text-primary bg-tertiary hover:text-[#ABA19C] 
                            hover:bg-primary px-4 py-1.5 mb-4 rounded-3xl hover:scale-95 float-right"
                  onClick={() => setShowCreateReview(!showCreateReview)}
                >
                  {showCreateReview ? "Cancel" : ""}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col bg-white pr-2 pl-1">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full px-4 py-4 rounded-3xl mb-4 cursor-pointer shadow hover:shadow-lg"
                  onClick={() =>
                    setOpen((prevArr) => {
                      const newArr = [...prevArr];
                      newArr[index] = !newArr[index];
                      return newArr;
                    })
                  }
                >
                  <div className="w-full flex justify-between px-3 py-1 items-center">
                    {edit[index] ? (
                      <input
                        type="text"
                        className="w-full bg-tertiary px-5 py-3 rounded-3xl mb-4 focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                        placeholder="질문을 입력하세요"
                        value={editData.question}
                        onChange={(e) =>
                          setEditData({ ...editData, question: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-lg font-bold text-primary mb-2">
                        Q. {review.question}
                      </p>
                    )}

                    <div className="flex">
                      {edit[index] ? (
                        <div className="flex ml-4">
                          <svg
                            class="h-7 w-7 text-gray-700 mb-4 hover:scale-[80%] mr-3"
                            onClick={() => {
                              setReviews(
                                reviews.map((r, i) => {
                                  if (i === index) {
                                    return editData;
                                  } else {
                                    return r;
                                  }
                                }),
                              );
                              setEdit((prevArr) => {
                                const newArr = [...prevArr];
                                newArr[index] = !newArr[index];
                                return newArr;
                              });
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                          <svg
                            class="h-7 w-7 text-gray-700 mb-4 hover:scale-[80%]"
                            onClick={() => {
                              setEdit((prevArr) => {
                                const newArr = [...prevArr];
                                newArr[index] = !newArr[index];
                                return newArr;
                              });
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />{" "}
                            <line x1="18" y1="6" x2="6" y2="18" />{" "}
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                      ) : (
                        <>
                          <svg
                            class="h-6 w-6 text-gray-700 mr-4 hover:scale-[80%] mt-1.5"
                            onClick={() => {
                              setEditData({
                                question: review.question,
                                answer: review.answer,
                              });
                              setEdit((prevArr) => {
                                const newArr = [...prevArr];
                                newArr[index] = !newArr[index];
                                return newArr;
                              });
                            }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>

                          <svg
                            class="h-6 w-6 text-gray-700 hover:scale-[80%] mt-1.5 mr-1"
                            onClick={() => {
                              const ok = confirm("정말로 삭제하시겠습니까?");
                              if (ok) {
                                setReviews( reviews.filter((r, i) => i !== index) );
                              }
                            }}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            {" "}
                            <polyline points="3 6 5 6 21 6" />{" "}
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                            <line x1="10" y1="11" x2="10" y2="17" />{" "}
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>

                  {(open[index] || edit[index]) && (
                    <div className="pr-5">
                      {edit[index] ? (
                        <textarea
                          rows={7}
                          cols={30}
                          className="w-full border-2 border-primary px-5 py-4 mx-3 
                                                rounded-2xl mb-2 focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                          placeholder="답변을 입력하세요"
                          value={editData.answer}
                          onChange={(e) =>
                            setEditData({ ...editData, answer: e.target.value })
                          }
                        />
                      ) : (
                        <p className="bg-tertiary rounded-2xl px-3 mr-3 ml-3 py-2 mb-4 text-base font-bold text-gray-500 pl-5 my-2">
                          A. {review.answer}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex mb-2 items-center ml-1.5">
                    <div>
                      {review.tags.map((tag, _) => (
                        <button
                          key={tag.id}
                          className="ml-3 px-3 py-1 text-sm rounded-3xl text-white font-base"
                          style={{
                            backgroundColor: tag.color,
                          }}
                        >
                          #{tag.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  
                </div>
              ))}
            </>
          ) : (
            <p className="text-xl font-bold text-[#ABA19C] mb-4">
              회고를 작성해주세요
            </p>
          )}
        </div>
      </Layout>
    )
  );
}
