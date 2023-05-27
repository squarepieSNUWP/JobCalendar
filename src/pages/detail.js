import Layout from "@/components/Layout";
import React, { useRef, useState } from 'react';

export default function Detail() {
  const [files, setFiles] = useState({
    resume: null,
    coverLetter: null,
    portfolio: null
  });
  const fileInputRefs = {
    resume: useRef(null),
    coverLetter: useRef(null),
    portfolio: useRef(null)
  };
  const [activeFile, setActiveFile] = useState(null);

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prevFiles => ({ ...prevFiles, [fileType]: file }));
    }
  };

  const openFileExplorer = (fileType) => {
    fileInputRefs[fileType].current.click();
  };

  const handleFileView = (fileType) => {
    setActiveFile(fileType);
  };

  const renderFileContent = () => {
    if (activeFile && files[activeFile]) {
      return <embed src={URL.createObjectURL(files[activeFile])} type="application/pdf" width="100%" height="100%" />;
    }
    return <div>Please select a file.</div>;
  };

  return (
    <Layout>
      <div>
        <div class="inset-0 flex flex-col justify-end">
            <div class="bg-primary p-0 rounded-full w-8 h-8 text-center">
              <p class="text-white font-bold place-self-center pt-1">X</p>
            </div>

            <div class="place-self-center bg-white p-4 rounded-2xl shadow drop-shadow-md mt-8 mb-9 w-full h-52">
            </div>
        </div>
        
        {/* 여기부터 pdf 파일 삽입 및 확인 구간 */}
        <div className="flex">
          <div className="w-1/4">
            <div className="bg-white p-4 rounded-2xl mb-3">
              <div className="flex flex-col mb-1">
                <span className="font-normal ml-2">이력서</span>
                <button
                  className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                  onClick={() => handleFileView('resume')}
                >
                  {files.resume ? '파일 보기' : 'PDF 파일 선택'}
                </button>
                <input
                  type="file"
                  ref={fileInputRefs.resume}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'resume')}
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-3">
              <div className="flex flex-col mb-1">
                <span className="font-normal ml-2">자소서</span>
                <button
                  className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                  onClick={() => handleFileView('coverLetter')}
                >
                  {files.coverLetter ? '파일 보기' : 'PDF 파일 선택'}
                </button>
                <input
                  type="file"
                  ref={fileInputRefs.coverLetter}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'coverLetter')}
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl mb-3">
              <div className="flex flex-col mb-1">
                <span className="font-normal ml-2">포트폴리오</span>
                <button
                  className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2"
                  onClick={() => handleFileView('portfolio')}
                >
                  {files.portfolio ? '파일 보기' : 'PDF 파일 선택'}
                </button>
                <input
                  type="file"
                  ref={fileInputRefs.portfolio}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'portfolio')}
                />
              </div>
            </div>
          </div>
          <div className="w-3/4">
            <div className="bg-white p-4 rounded-2xl h-full">
              {renderFileContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

