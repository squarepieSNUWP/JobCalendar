import Layout from "@/components/Layout";
import React, { useRef } from 'react';

export default function Detail() {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // 선택 파일 업로드/추가하는 로직 삽입 필요
    console.log('Uploaded file:', file);
  };

  return (
    <Layout>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <div class="inset-0 flex flex-col justify-end">
          <div class="bg-primary p-0 rounded-full w-8 h-8 text-center">
            <p class="text-white font-bold place-self-center pt-1">X</p>
          </div>

          <div class="place-self-center bg-white p-4 rounded-2xl shadow drop-shadow-md mb-9 w-3/4 h-52">
            </div>
          
          {/* 여기부터 pdf 파일 삽입 구간. */}

          <div class="bg-secondary/80 p-3 py-5 place-self-center rounded-2xl shadow drop-shadow-lg w-3/4">
            <div className="flex flex-col">

              <div className="bg-white p-4 rounded-2xl">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">이력서</span>
                  <button
                    className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 "
                    onClick={() => fileInputRef.current.click()}
                  >
                    PDF 파일 선택
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl mt-3">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">자소서</span>
                  <button
                    className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 "
                    onClick={() => fileInputRef.current.click()}
                  >
                    PDF 파일 선택
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl mt-3 ">
                <div className="flex flex-col mb-1">
                  <span className="font-normal ml-2">포트폴리오</span>
                  <button
                    className="bg-secondary/20 hover:bg-secondary/50 text-secondary py-2 px-4 rounded-2xl mt-2 "
                    onClick={() => fileInputRef.current.click()}
                  >
                    PDF 파일 선택
                  </button>
                </div>
              </div>

          </div>
        </div>    
        </div>
      </div>
    </Layout>
  );
}
