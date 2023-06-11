import Layout from "@/components/Layout";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
// import { uploadPdf, deletePdf, getPdf } from "../pages/api/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getJob } from "@/api/job";
import { createCV, getCV, updateCV } from "@/api/cv";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("files");

  const [files, setFiles] = useState({
    resume: null,
    coverLetter: null,
    portfolio: null,
  });

  const fileInputRefs = {
    resume: useRef(null),
    coverLetter: useRef(null),
    portfolio: useRef(null),
  };

  const [activeFile, setActiveFile] = useState(null);

  const [myPageFiles, setMyPageFiles] = useState({
    resumes: [
      { id: 1, url: "resume1_url", title: "네모난파이_이력서_ver1" },
      { id: 2, url: "resume2_url", title: "네모난파이_이력서_ver2" },
    ],
    portfolios: [
      { id: 1, url: "portfolio1_url", title: "네모난파이_포폴_ver1" },
      { id: 2, url: "portfolio2_url", title: "네모난파이_포폴_ver2" },
    ],
  });

  // 자소서 텍스트 부분 관련 변수
  const [job, setJob] = useState(null)
  const [jobLink, setJobLink] = useState(null)
  const [coverLetters, setCoverLetters] = useState([]);

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
    // job & coverLetters 세팅 
    const getJobAPI = async (jobId) => {
      const job = await getJob(jobId);
      setJob(job);
    }

    const getCoverLetterAPI = async (jobId) => {
      const cvData = await getCV(jobId);
      setCoverLetters(cvData);
    }
    if(id) {
      getCoverLetterAPI(id)
      getJobAPI(id)
    };
  }, [id]);


  // useEffect(() => {
  //   //세션 있는지 검사해서 있으면 userId에 저장함(api call에 사용됨)
  //   if (session) {
  //     setUserId(session.user.id);
  //   } else console.log("no session");

  //   //기존에 유저가 올려둔 pdf 파일들을 가져 오는 api call
  //   const getPdfAPI = async () => {};

  //   if (session) getPdfAPI(userId);
  // }, [userId, session]);

  // const handleFileUpload = async (e, fileType) => {
  //   //클릭한 곳의 파일이 발견되면
  //   const file = e.target.files[0];
  //   if (file) {
  //     //파일 객체를 files 객체 안에 추가
  //     setFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
  //     try {
  //       await uploadPdf(file, fileType, userId);
  //     } catch (error) {
  //       console.error("Error uploading file", error.message);
  //     }
  //   }
  // };

  // const openFileExplorer = (fileType) => {
  //   fileInputRefs[fileType].current.click();
  // };

  // const handleFileView = (fileType) => {
  //   setActiveFile(fileType);
  // };

  // const handleFileChange = async (fileType) => {
  //   const file = files[fileType];
  //   setActiveFile(null);
  //   setFiles((prevFiles) => ({ ...prevFiles, [fileType]: null }));
  //   fileInputRefs[fileType].current.value = null;
  //   try {
  //     //deletePdf api를 불러서 선택된 파일을 storage에서 지움
  //     await deletePdf(file, fileType, userId);
  //   } catch (error) {
  //     console.error("error while calling api");
  //   }
  // };

  const renderFileContent = () => {
    //기존에는 프론트에서 url을 생성하여 embed하던 것을 서버에서 응답으로 보낸 url을 활용하도록 변경
    if (activeFile && files[activeFile]) {
      const file = files[activeFile];
      return <embed src={file.url} type="application/pdf" width="100%" height="100%" />;
    }
    return <div className="bg-white rounded-2xl shadow drop-shadow-sm w-full h-full"></div>;
  };

  return (
    job && (
      <Layout>
        <div>
          <div className="bg-gradient-to-r from-[#f5eeebe7] to-[#F9F5F3] px-5 py-8 mb-6 rounded-3xl relative">
            <div
              className="flex flex-col justify-end mr-7 absolute
                        top-1/2 right-0 transform -translate-y-1/2 "
            >
              <a
                href={job.link}
                target="_blank"
                class="relative inline-flex mb-2.5 items-center justify-center px-5 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 
            ease-out border-[1px] border-zinc-700 rounded-full group"
              >
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-secondary duration-200 -translate-x-full bg-zinc-700 group-hover:translate-x-0 ease">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span class="absolute flex items-center text-sm justify-center font-semibold fon w-full h-full text-zinc-700 transition-all duration-300 transform group-hover:translate-x-full ease">
                  공고 보러가기
                </span>
                <span class="relative invisible text-sm">공고 보러가기</span>
              </a>

              <a
                href={`/review/${id}`}
                class="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 
            ease-out border-[1px] border-zinc-700 rounded-full group"
              >
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-secondary duration-200 -translate-x-full bg-zinc-700 group-hover:translate-x-0 ease">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span class="absolute flex items-center text-sm justify-center font-semibold w-full h-full text-zinc-700 transition-all duration-300 transform group-hover:translate-x-full ease">
                  회고 보러가기
                </span>
                <span class="relative invisible text-sm">회고 보러가기</span>
              </a>
            </div>

            <h1 className="text-2xl font-bold mb-2 text-left pl-4 text-primary tracking-tight">{job?.title}</h1>
            <p className="text-xl font-base text-stone-600/90 pl-4 tracking-tight text-left">{job?.company}</p>
          </div>

          {/* 탭버튼 UI */}
          <div>
            <button
              className={`transform translate-y-0 hover:translate-y-1 duration-300 ease-in-out py-[6px] px-5 font-bold rounded-t-2xl mt-2 mr-2 
            ${activeTab == "files" ? "bg-[#EADFDA]" : "bg-[#EADFDA]/50"} `}
              style={{ opacity: activeTab === "files" ? 1 : 0.7 }}
              onClick={() => {
                setActiveTab("files");
              }}
            >
              이력서/포트폴리오
            </button>
            <button
              className={`transform translate-y-0 hover:translate-y-1 duration-300 ease-in-out py-[6px] px-5 font-bold rounded-t-2xl mt-2 
            ${activeTab == "letter" ? "bg-[#EADFDA]" : "bg-[#EADFDA]/50"}
             `}
              style={{ opacity: activeTab === "letter" ? 1 : 0.7 }}
              onClick={() => {
                setActiveTab("letter");
              }}
            >
              자기소개서
            </button>
          </div>

          {/* 여기부터 pdf 파일 삽입 및 확인 구간 */}
          {activeTab === "files" && (
            <div className="place-self-center bg-[#EADFDA] p-4 rounded-r-2xl rounded-b-2xl mt-0 w-full">
              <div className="flex">
                <div className="flex flex-col w-1/4">
                  <div className="mt-1 rounded-full w-64 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>

                  <div className="flex flex-col items-center mt-5 w-full">
                    <div className="bg-white p-3 rounded-2xl mb-1.5 w-64">
                      <div className="flex flex-col mb-1">
                        <span className="font-normal ml-2">이력서</span>

                        <select className="bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] py-2 px-4 rounded-2xl mt-2">
                          <option className="text-center " value="" disabled selected>
                            불러오기
                          </option>
                          {myPageFiles.resumes.map((resume) => {
                            return <option value={resume.id}>{resume.title}</option>;
                          })}
                        </select>

                        <input type="file" ref={fileInputRefs.resume} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "resume")} />
                      </div>
                    </div>
                    <button
                      className="place-self-end bg-[#C3B1A9]/80 hover:bg-[#C3B1A9] text-white text-sm py-2 px-5 
                            rounded-2xl mt-1 mr-5"
                      onClick={() => handleFileView("resume")}
                    >
                      파일 보기
                    </button>
                  </div>

                  <div className="mt-5 rounded-full w-64 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>

                  <div className="flex flex-col items-center mt-5 w-full">
                    <div className="bg-white p-3 rounded-2xl mb-1.5 w-64">
                      <div className="flex flex-col mb-1">
                        <span className="font-normal ml-2">포트폴리오</span>

                        <select className="bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] py-2 px-4 rounded-2xl mt-2">
                          <option className="text-center" value="" disabled selected>
                            불러오기
                          </option>
                          {myPageFiles.portfolios.map((portfolio) => {
                            return <option value={portfolio.id}>{portfolio.title}</option>;
                          })}
                        </select>
                      </div>

                      <input type="file" ref={fileInputRefs.portfolio} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "portfolio")} />
                    </div>
                    <button
                      className="place-self-end bg-[#C3B1A9]/80 hover:bg-[#C3B1A9] text-white text-sm py-2 px-5 
                            rounded-2xl mt-1 mr-5"
                      onClick={() => handleFileView("portfolio")}
                    >
                      파일 보기
                    </button>
                  </div>

                  <div className="mt-5 rounded-full w-64 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>
                </div>
                <div className="w-3/4">
                  <div className="pl-2 rounded-2xl h-[400px]">{renderFileContent()}</div>
                </div>
              </div>
            </div>
          )}

          {/* 자소서 질문-딥변 입력 부분 */}
          {activeTab == "letter" && (
            <div className="p-4 bg-[#EADFDA] rounded-b-2xl rounded-tr-2xl">
              <div className="flex flex-col mt-3 px-4">
                {coverLetters.map((coverLetter, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full pr-4 pl-6 py-6 rounded-3xl 
                    bg-white mb-4 cursor-pointer hover:shadow-lg"
                      onClick={() =>
                        setOpen((prevArr) => {
                          const newArr = [...prevArr];
                          newArr[index] = !newArr[index];
                          return newArr;
                        })
                      }
                    >
                      <div className="w-full flex justify-between items-center">
                        {edit[index] ? (
                          <input
                            type="text"
                            className="w-full bg-tertiary px-5 py-3 rounded-3xl mb-4 focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                            placeholder="질문을 입력하세요"
                            value={editData.question}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                question: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="text-lg font-bold text-primary">Q. {coverLetter.question}</p>
                        )}

                        <div>
                          {edit[index] ? (
                            <div className="flex ml-6">
                              <svg
                                class="h-7 w-7 text-gray-700 mb-4 hover:scale-[80%] mr-1.5"
                                onClick={ async () => {
                                  setCoverLetters(coverLetters.map((r, i) => {
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
                                  await updateCV({ id: coverLetter.id, ...editData })
                                  console.log("SETEDIT");
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
                                <path stroke="none" d="M0 0h24v24H0z" /> <line x1="18" y1="6" x2="6" y2="18" /> <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </div>
                          ) : (
                            <svg
                              class="h-6 w-6 text-gray-700 mr-4 hover:scale-[80%]"
                              onClick={() => {
                                setEditData({
                                  question: coverLetter.question,
                                  answer: coverLetter.answer,
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
                          )}
                        </div>
                      </div>
                      {(open[index] || edit[index]) && (
                        <div>
                          {edit[index] ? (
                            <textarea
                              rows={8}
                              cols={35}
                              className="w-full border-2 border-primary px-5 py-4 ml-2 mr-3 
                            rounded-2xl mb-2 focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                              placeholder="답변을 입력하세요"
                              value={editData.answer}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  answer: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <p
                              className="bg-tertiary rounded-2xl px-5 mr-3 ml-2 py-3 mt-5 text-base 
                          text-gray-500 pl-5 my-2"
                            >
                              A. {coverLetter.answer}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-4 mb-12 rounded-3xl">
                <input
                  type="text"
                  className="w-full bg-stone-100 border-2 border-gray-300 px-6 py-3 rounded-3xl mt-2
                focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                  placeholder="질문을 입력하세요"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />

                <textarea
                  rows={8}
                  cols={35}
                  className="w-full border-2 bg-stone-100 border-gray-300 px-6 py-4 rounded-3xl mt-3 mb-2
                focus:bg-white focus:outline-none focus:ring focus:ring-tertiary"
                  placeholder="답변을 입력하세요"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                />

                <button
                  className="text-lg font-semibold text-white bg-[#C3B1A9]/80 hover:bg-[#C3B1A9] 
                hover:bg-primary px-4 py-1.5 mb-4 mr-2 rounded-3xl hover:scale-95 float-right"
                  onClick={async () => {
                    const new_id = await createCV({ ...formData, jobId: id });

                    setCoverLetters([
                      ...coverLetters,
                      {
                        ...formData,
                        id: new_id,
                      }
                    ])

                    

                    setFormData({
                      question: "",
                      answer: "",
                    });
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    )
  );
}
