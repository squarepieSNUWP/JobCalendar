import Layout from "@/components/Layout";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { uploadPdf, deletePdf, getPdf } from "../pages/api/api";
import { useSession } from "next-auth/react";

export default function Detail() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('files')

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
  const [job, setJob] = useState({
    id: 2,
    title: "백엔드 개발자 (3년 이상)",
    summary: `• 백 개발 경력 3년 이상 이신 분
        • Java, Spring Boot 개발에 능숙하신 분
        • 대규모 트래픽을 다뤄본 경험이 있으신 분
        `,
    company: "웹프개",
    occupation: "백엔드 개발자",
    startDate: "2023-05-01T00:00",
    endDate: "2023-05-29T24:00",
    reviews: [
      {
        question: "왜 백엔드에 지원했나요?",
        answer: "UI를 만드는 작업보다 데이터를 다루는 작업이 더 재밌어서요.",
      },
    ],
    coverLetters: [
      {
        question: "새로운 것을 접목하거나 남다른 아이디어를 통해 문제를 개선했던 경험에 대해 서술해 주십시오.",
        answer:
          "4학년 여름 AI 연구 기관에서 2달 간 AI 엔지니어링 인턴쉽에 도전했습니다. 7개의 kaggle competition 중 3개는 40% 이내, 4개는 100% 이내의 예측 정확도 산출을 할당 받았지만, 자발적으로 7개 모두에서 40% 이내의 예측 정확도를 산출하는 목표에 도전했습니다. 경영 전공 도메인을 살려 글로벌 기업의 DB를 분석하여 솔루션을 도출하는 competition 위주로 솔루션을 도출하는 목표를 수립했습니다. 처음에는 인턴 중 제가 가장 부족한 데이터 분석 경험과 AI 역량을 갖고 있어 목표 달성 가능성은 0에 가깝다고 생각했습니다. 실제로, 초기엔 판다스와 사이킷런과 같은 기본적인 오픈 소스들의 사용법도 몰라 좌절했습니다. 그래서 최종 목표 달성을 위해, competition의 난이도를 1부터 7까지 분류하고 모든 난이도를 각각 1개씩 포함한 7개의 competition을 선정하여, 단계별 초과달성을 통해 체계적인 역량 성장과 최종 목표를 달성하는 전략을 세웠습니다.",
      },
      {
        question: "도전적 목표를 설정하고 열정을 다하였던 경험을 구체적으로 기술해 주세요.",
        answer:
          "교내 SW 공모전에 나가서, 전무한 웹 개발 실력과 취업 준비로 인한 시간적 한계에도 불구하고 결국 수상이라는 목표를 달성하는 열정을 발휘했습니다. 기존의 저의 개발 방식은 교재를 보며 단계별로 그것의 코드를 따라 구현해보는 식이었습니다. 하지만 마감일이 닥쳐오는 상황에서 결과물은 기초적인 수준이었고, 따라서 저는 새로운 접근법을 과감히 취했습니다. 그것은 이미 제가 원하는 기능을 구현한 소스 코드를 참고하여 기능 구현에 필요한 최적의 라이브러리와 구현 방식을 공부하는 것이었습니다. 과감한 시도를 한 이유는, 실력이 부족한 저를 믿고 따라와 준 팀원에게 수상의 기쁨을 선사하고 싶었기 때문입니다. 하지만 이에 대해 저의 친구들은 취업 준비로 인해 현실적으로 개발에 투자할 시간이 부족한데다 어려운 코드를 이해하지 못할 거라는 부정적인 의견을 주었습니다. 개발 역량을 쌓기 위해, 저는 일상에서 불필요하게 소비되는 시간을 최소한으로 줄이고, 주중 하루 공부 시간을 10시간으로 늘려 다른 학업을 일찍 끝마친 채, 나머지 며칠은 팀원과 오직 웹 개발에만 몰두했습니다. 이를 보고 저의 친구들도 많은 조언을 주었습니다. 결과적으로 팀은 처음에 목표했던 기능인 화상 채팅과 실시간 대화, 게시판 기능 등을 담은 “OOOOO”라는 초등 교육 지원 웹 앱을 구현하여 수상할 수 있었습니다. 이처럼 SK C&C에서도 창의성을 발휘하는 엔지니어가 되겠습니다.",
      },
    ],
  });
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
    //세션 있는지 검사해서 있으면 userId에 저장함(api call에 사용됨)
    if (session) {
      setUserId(session.user.id);
    } else console.log("no session");

    //기존에 유저가 올려둔 pdf 파일들을 가져 오는 api call
    const getPdfAPI = async () => {
      const pdfFiles = await getPdf(userId);
      console.log("get pdf activated");

      //응답으로 받아온 것을 fileType을 기준으로 기존의 files 객체 속에 저장 (ex. resume, portfolio에 해당하는 파일이 있으면 렌더링됨과 동시에 files.resume와 files.portfolio에는 해당 파일의 참조가 담기게 됨)
      pdfFiles.forEach((file) => {
        const { name, url, fileType } = file;
        setFiles((prevFiles) => ({
          ...prevFiles,
          [fileType]: { name, url },
        }));
      });
    };

    if (userId) getPdfAPI();
  }, [userId, session]);

  const handleFileUpload = async (e, fileType) => {
    //클릭한 곳의 파일이 발견되면
    const file = e.target.files[0];
    if (file) {
      //파일 객체를 files 객체 안에 추가
      setFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
      try {
        await uploadPdf(file, fileType, userId);
      } catch (error) {
        console.error("Error uploading file", error.message);
      }
    }
  };

  const openFileExplorer = (fileType) => {
    fileInputRefs[fileType].current.click();
  };

  const handleFileView = (fileType) => {
    setActiveFile(fileType);
  };

  const handleFileChange = async (fileType) => {
    const file = files[fileType];
    setActiveFile(null);
    setFiles((prevFiles) => ({ ...prevFiles, [fileType]: null }));
    fileInputRefs[fileType].current.value = null;
    try {
      //deletePdf api를 불러서 선택된 파일을 storage에서 지움
      await deletePdf(file, fileType, userId);
    } catch (error) {
      console.error("error while calling api");
    }
  };

  const renderFileContent = () => {
    //기존에는 프론트에서 url을 생성하여 embed하던 것을 서버에서 응답으로 보낸 url을 활용하도록 변경
    if (activeFile && files[activeFile]) {
      const file = files[activeFile];
      return (
        <embed
          src={file.url}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      );
    }
    return (
      <div className="bg-white rounded-2xl shadow drop-shadow-md w-full h-full"></div>
    );
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-end mb-6">
          <button className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95 m1-2">
            <a href="https://www.wanted.co.kr/wd/161336" target="_blank" rel="noopener noreferrer">
              공고 링크
            </a>
          </button>

          <button className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95 ml-2">일정 추가</button>

          <button className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95 ml-2">
            <Link href="/review">회고 하기</Link>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-primary mb-10">공고 제목</h1>

        {/* <Link
        <div className="inset-0 flex flex-col justify-end">
          {/* <Link
            href="/"
            className="bg-primary rounded-full w-8 h-8 pt-0.5 text-center ml-auto hover:bg-secondary"
          >
            <Link href="/" className="text-normal font-bold text-white pt-8">
              X
            </Link>
          </Link> */}

        {/* <div className="place-self-center bg-white p-4 rounded-2xl shadow drop-shadow-md mt-4 mb-6 w-full h-52">
          <p>공고 내용 삽입 구간</p>
        </div> */}

        {/* 탭버튼 UI */}
        <div>
          <button
            className={`bg-secondary/20 hover:bg-secondary/50 py-2 px-4 rounded-t-2xl mt-2 mr-2 border-secondary 
            ${activeTab == "files" ? "border-t-2 border-l-2 border-r-2" : null} `}
            onClick={() => {
              setActiveTab("files");
            }}
          >
            이력서/포트폴리오
          </button>
          <button
            className={`bg-secondary/20 hover:bg-secondary/50 py-2 px-4 rounded-t-2xl mt-2 border-secondary
            ${activeTab == "letter" ? "border-t-2 border-l-2 border-r-2" : null} `}
            onClick={() => {
              setActiveTab("letter");
            }}
          >
            자기소개서
          </button>
        </div>

        {/* 여기부터 pdf 파일 삽입 및 확인 구간 */}
        {activeTab === "files" && (
          <div className="place-self-center bg-secondary p-4 rounded-r-2xl rounded-b-2xl mt-0 mb-0 w-full">
            <div className="flex">
              <div className="w-1/4">
                <div className="bg-white p-3 rounded-2xl mb-3">
                  <div className="flex flex-col mb-1">
                    <span className="font-normal ml-2">이력서</span>
                    {files.resume ? (
                      <div
                        className="flex space-x-2 justify-center">
                        <button
                          className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2" onClick={() => handleFileView("resume")}>
                          파일 보기
                        </button>
                        <button
                          className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2" onClick={() => handleFileChange("resume")}>
                          파일 삭제
                        </button>
                      </div>
                    ) : (
                      <>
                          <button
                            className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                            onClick={() => openFileExplorer("resume")}>
                          PDF 파일 선택
                        </button>
                          <select
                            className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2">
                            <option
                              className="text-center" value=""
                              disabled selected>
                              불러오기
                            </option>
                            {myPageFiles.resumes.map((resume) => {
                              return <option value={resume.id}>{resume.title}</option>;
                            })}
                          </select>
                      </>
                    )}
                    <input type="file" ref={fileInputRefs.resume} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "resume")} />
                  </div>
                </div>
                {/* <div className="bg-white p-3 rounded-2xl mb-3">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">자소서</span>
                  {files.coverLetter ? (
                    <div className="flex space-x-2 justify-center">
                      <button className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2" onClick={() => handleFileView("coverLetter")}>
                        파일 보기
                      </button>
                      <button className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2" onClick={() => handleFileChange("coverLetter")}>
                        파일 삭제
                      </button>
                    </div>
                  ) : (
                    <button className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2" onClick={() => openFileExplorer("coverLetter")}>
                      PDF 파일 선택
                    </button>
                  )}
                  <input type="file" ref={fileInputRefs.coverLetter} style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "coverLetter")} />
                </div>
              </div> */}
                <div className="bg-white p-3 rounded-2xl">
                  <div className="flex flex-col mb-1">
                    <span className="font-normal ml-2">포트폴리오</span>
                    {files.portfolio ? (
                      <div className="flex space-x-2 justify-center">
                        <button
                          className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2" onClick={() => handleFileView("portfolio")}>
                          파일 보기
                        </button>
                        <button
                          className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2" onClick={() => handleFileChange("portfolio")}>
                          파일 삭제
                        </button>
                      </div>
                    ) : (
                        <>
                          <button
                            className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                            onClick={() => openFileExplorer("portfolio")}>
                            PDF 파일 선택
                          </button>
                          <select
                            className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2">
                            <option
                              className="text-center" value=""
                              disabled selected>
                              불러오기
                            </option>
                            {myPageFiles.portfolios.map((portfolio) => {
                              return <option value={portfolio.id}>{portfolio.title}</option>;
                            })}
                          </select>
                          
                        </>
                    )}
                    <input
                      type="file"
                      ref={fileInputRefs.portfolio}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload(e, "portfolio")} />
                  </div>
                </div>
              </div>
              <div className="w-3/4">
                <div className="p-4 rounded-2xl h-full">{renderFileContent()}</div>
              </div>
            </div>
          </div>
        )}


        {/* 자소서 질문-딥변 입력 부분 */}
        {activeTab == "letter" && (
          <div className="p-4 border-secondary border-2 rounded-r-2xl rounded-b-2xl">
            <div className="flex flex-col">
              {job.coverLetters.map((coverLetter, index) => {
                return (
                  <div
                    key={index}
                    className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4 cursor-pointer"
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
                          className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4"
                          placeholder="질문을 입력하세요"
                          value={editData.question}
                          onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                        />
                      ) : (
                        <p className="text-xl font-bold text-primary">
                          Q.
                          {coverLetter.question}
                        </p>
                      )}

                      <div>
                        {edit[index] ? (
                          <div className="flex ml-6">
                            <button
                              className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95 mr-4"
                              onClick={() => {
                                setJob({
                                  ...job,
                                  coverLetters: job.coverLetters.map((r, i) => {
                                    if (i === index) {
                                      return editData;
                                    } else {
                                      return r;
                                    }
                                  }),
                                });
                                setEdit((prevArr) => {
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
                                setEdit((prevArr) => {
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
                                question: coverLetter.question,
                                answer: coverLetter.answer,
                              });
                              setEdit((prevArr) => {
                                const newArr = [...prevArr];
                                newArr[index] = !newArr[index];
                                return newArr;
                              });
                            }}
                            className="text-base font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 rounded-xl hover:scale-95"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                    {(open[index] || edit[index]) && (
                      <div>
                        {edit[index] ? (
                          <textarea
                            rows={8}
                            cols={35}
                            className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4"
                            placeholder="답변을 입력하세요"
                            value={editData.answer}
                            onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                          />
                        ) : (
                          <p className="text-base font-bold text-[#ABA19C] my-4">A. {coverLetter.answer}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="my-10">
              <input
                type="text"
                className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4"
                placeholder="질문을 입력하세요"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />

              <textarea
                rows={8}
                cols={35}
                className="w-full border-2 border-primary px-8 py-4 rounded-xl mb-4"
                placeholder="답변을 입력하세요"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              />
              <button
                className="text-lg font-bold text-primary bg-secondary hover:text-[#ABA19C] hover:bg-primary px-4 py-2 mb-4 rounded-xl hover:scale-95 float-right"
                onClick={() => {
                  setJob({
                    ...job,
                    coverLetters: [...job.coverLetters, formData],
                  });
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
  );
}
