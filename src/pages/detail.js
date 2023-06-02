import Layout from "@/components/Layout";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { uploadPdf, deletePdf, getPdf } from "../pages/api/api";
import { useSession } from "next-auth/react";

export default function Detail() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);

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
  }, [userId]);

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
        <div className="inset-0 flex flex-col justify-end">
          <Link
            href="/"
            className="bg-primary rounded-full w-8 h-8 pt-0.5 text-center ml-auto hover:bg-secondary"
          >
            <Link href="/" className="text-normal font-bold text-white pt-8">
              X
            </Link>
          </Link>

          <div className="place-self-center bg-white p-4 rounded-2xl shadow drop-shadow-md mt-4 mb-6 w-full h-52">
            <p>공고 내용 삽입 구간</p>
          </div>
        </div>

        {/* 여기부터 pdf 파일 삽입 및 확인 구간 */}
        <div className="place-self-center bg-secondary p-4 rounded-2xl mt-0 mb-0 w-full">
          <div className="flex">
            <div className="w-1/4">
              <div className="bg-white p-3 rounded-2xl mb-3">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">이력서</span>
                  {files.resume ? (
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2"
                        onClick={() => handleFileView("resume")}
                      >
                        파일 보기
                      </button>
                      <button
                        className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2"
                        onClick={() => handleFileChange("resume")}
                      >
                        파일 삭제
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                      onClick={() => openFileExplorer("resume")}
                    >
                      PDF 파일 선택
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRefs.resume}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "resume")}
                  />
                </div>
              </div>
              <div className="bg-white p-3 rounded-2xl mb-3">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">자소서</span>
                  {files.coverLetter ? (
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2"
                        onClick={() => handleFileView("coverLetter")}
                      >
                        파일 보기
                      </button>
                      <button
                        className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2"
                        onClick={() => handleFileChange("coverLetter")}
                      >
                        파일 삭제
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                      onClick={() => openFileExplorer("coverLetter")}
                    >
                      PDF 파일 선택
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRefs.coverLetter}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "coverLetter")}
                  />
                </div>
              </div>
              <div className="bg-white p-3 rounded-2xl">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">포트폴리오</span>
                  {files.portfolio ? (
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2"
                        onClick={() => handleFileView("portfolio")}
                      >
                        파일 보기
                      </button>
                      <button
                        className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 w-1/2"
                        onClick={() => handleFileChange("portfolio")}
                      >
                        파일 삭제
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                      onClick={() => openFileExplorer("portfolio")}
                    >
                      PDF 파일 선택
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRefs.portfolio}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "portfolio")}
                  />
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <div className="p-4 rounded-2xl h-full">
                {renderFileContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
