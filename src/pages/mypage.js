import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { createFile, getMyFiles, deleteFile } from "@/api/file";

export default function MyPage() {
  const { data: session } = useSession();

  const [tab, setTab] = useState("cv");
  const [userId, setUserId] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  if (!session && typeof window !== "undefined") {
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchUserFiles = async (userId) => {
      try {
        const files = await getMyFiles(userId);
        setUserFiles(files);
      } catch (error) {
        console.log("Error fetching user files:", error.message);
      }
    };
    if (session) {
      setUserId(session.user.id);
    } else console.log("no session");
    fetchUserFiles(userId);
  }, [userId, session]);

  const fileInputRefs = useRef(null);

  const openFileExplorer = () => {
    fileInputRefs.current.click();
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const title = selectedFile.name;
    const newFile = {
      file: selectedFile,
      title: title,
      userId: userId,
      fileType: tab,
    };
    createFile(newFile);
    setUserFiles((prevUserFiles) => [...prevUserFiles, newFile]);
  };

  const renderFileContent = (fileId) => {
    const file = userFiles.find((file) => file.id === fileId);

    if (file) {
      return (
        <embed
          src={file.fileUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      );
    }
    return (
      <div className="bg-white rounded-2xl shadow drop-shadow-sm w-full h-full"></div>
    );
  };

  const handleFileDelete = async (fileId) => {
    await deleteFile(fileId);
    setActiveFile(null);
    setUserFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
  };

  return (
    session &&
    session.user && (
      <Layout>
        <h1 className="text-6xl font-extrabold text-center text-primary">
          My Page
        </h1>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            {session.user.name}님의 활동기록
          </h2>
          <p className="text-xl text-primary mb-3">서류 제출 : 8회</p>
          <p className="text-xl text-primary mb-3">면접 횟수 : 8회</p>
        </div>

        <div>
          <button
            className={`transform translate-y-0 hover:translate-y-1 duration-300 ease-in-out py-[6px] px-5 font-bold rounded-t-2xl mt-2 mr-2 
            ${tab == "cv" ? "bg-[#EADFDA]" : "bg-[#EADFDA]/50"} `}
            style={{ opacity: tab === "cv" ? 1 : 0.7 }}
            onClick={() => {
              setTab("cv");
            }}
          >
            이력서
          </button>
          <button
            className={`transform translate-y-0 hover:translate-y-1 duration-300 ease-in-out py-[6px] px-5 font-bold rounded-t-2xl mt-2 
            ${tab == "portfolio" ? "bg-[#EADFDA]" : "bg-[#EADFDA]/50"}
            `}
            style={{ opacity: tab === "portfolio" ? 1 : 0.7 }}
            onClick={() => {
              setTab("portfolio");
            }}
          >
            포트폴리오
          </button>
        </div>

        <div className="place-self-center bg-[#EADFDA] p-4 rounded-r-2xl rounded-b-2xl mt-0 w-full">
          <div className="flex">
            <div className="flex flex-col w-1/4">
              <div className="mt-1 rounded-full w-64 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>

              <div className="flex flex-col items-center mt-5 w-full">
                <div className="bg-white p-3 rounded-2xl mb-1.5 w-64">
                  <div className="flex flex-col mb-1">
                    <span className="font-normal ml-2">
                      {tab === "cv" ? "이력서" : "포트폴리오"}
                    </span>

                    <button
                      onClick={openFileExplorer}
                      className="bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] py-2 px-4 rounded-2xl mt-2"
                    >
                      파일 업로드
                    </button>

                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRefs}
                      onChange={handleFileSelect}
                    />
                  </div>
                </div>
                <div className="bg-white p-3 rounded-2xl mb-1.5 w-64 h-64">
                  <div className="flex flex-col mb-1">
                    <span className="font-normal ml-2">
                      {tab === "cv" ? "이력서 목록" : "포트폴리오 목록"}
                    </span>
                    {userFiles
                      .filter((file) => file.fileType === tab)
                      .map((file) => (
                        <div key={file.id} className="flex items-center">
                          <button
                            className="bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] py-2 px-4 rounded-2xl mt-2 mr-2"
                            onClick={() => {
                              setActiveFile(file.id);
                              renderFileContent(file.id);
                            }}
                          >
                            {file.title}
                          </button>
                          <button
                            className="bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] py-2 px-4 rounded-2xl mt-2 mr-2"
                            onClick={() => handleFileDelete(file.id)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <div className="pl-2 rounded-2xl h-[400px]">
                {renderFileContent(activeFile)}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex">
          <button
            className={`${
              tab === "cv" ? "bg-secondary/50" : "bg-secondary/20"
            } hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mr-4`}
            onClick={() => setTab("cv")}
          >
            이력서
          </button>
          <button
            className={`${
              tab === "portfolio" ? "bg-secondary/50" : "bg-secondary/20"
            }  hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl`}
            onClick={() => setTab("portfolio")}
          >
            포트폴리오
          </button>
        </div>

        <div>
          {tab === "cv" ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center justify-center mt-10">
                <p className="text-xl font-bold text-primary mb-3">이력서</p>
                <p className="text-xl text-primary mb-3">
                  최근 업데이트 : 2021.09.01
                </p>
              </div>
              <button
                className={
                  "bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl"
                }
                onClick={openFileExplorer}
              >
                pdf 업로드하기
              </button>
              <input
                type="file"
                className="hidden"
                ref={fileInputRefs}
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center justify-center mt-10">
                <p className="text-xl font-bold text-primary mb-3">
                  포트폴리오
                </p>
                <p className="text-xl text-primary mb-3">
                  최근 업데이트 : 2021.09.01
                </p>
              </div>
              <button
                className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl"
                onClick={openFileExplorer}
              >
                pdf 업로드하기
              </button>
              <input
                type="file"
                className="hidden"
                ref={fileInputRefs}
                onChange={handleFileSelect}
              />
            </div>
          )}
        </div> */}
      </Layout>
    )
  );
}
