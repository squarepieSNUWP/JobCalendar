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

  const handleFileSelect = async (event) => {
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
    const result = await createFile(newFile);
    if (result) setUserFiles((prevUserFiles) => [...prevUserFiles, newFile]);
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
        <h1 className="text-3xl place-self-start font-bold text-left mb-8 mt-2 pl-4 text-primary">
          Documents
        </h1>

        <div>
          <button
            className={`transform translate-y-0 hover:translate-y-1 duration-300 ease-in-out pb-[8px] pt-[10px] px-7 text-[17px] font-bold rounded-t-2xl mt-1 mr-2 
            ${tab == "cv" ? "bg-[#EADFDA]" : "bg-[#EADFDA]/50"} `}
            style={{ opacity: tab === "cv" ? 1 : 0.7 }}
            onClick={() => {
              setTab("cv");
            }}
          >
            이력서
          </button>
          <button
            className={`transform translate-y-0 hover:translate-y-1 duration-300 ease-in-out pb-[8px] pt-[10px] px-7 text-[17px] font-bold rounded-t-2xl mt-1 
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
              <div className="mt-1 rounded-full w-60 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>

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

                <div className="mt-4 rounded-full w-60 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>

                <div className="bg-white p-3 rounded-2xl mt-5 mb-1.5 w-64 overflow-auto h-[263px]">
                  <div className="flex flex-col">
                    {userFiles
                      .filter((file) => file.fileType === tab)
                      .map((file) => (
                        <div key={file.id} className="flex items-center">
                          <button
                            className="bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] py-2 px-4 rounded-2xl my-1 mr-2 w-4/5"
                            onClick={() => {
                              setActiveFile(file.id);
                              renderFileContent(file.id);
                            }}
                          >
                            {file.title}
                          </button>
                          <svg
                            class="h-9 w-9 rounded-full px-2 py-2 bg-secondary/30 hover:bg-secondary/50 text-[#C3B1A9] "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => handleFileDelete(file.id)}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-4 rounded-full w-60 ml-3 h-1 p-0.1 bg-[#C3B1A9]/30 place-self-start"></div>
              </div>
            </div>
            <div className="w-3/4">
              <div className="pl-2 rounded-2xl h-full">
                {renderFileContent(activeFile)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
}
