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
        <div class="inset-0 flex items-center justify-center">
          <div class="bg-white p-4 rounded-2xl shadow drop-shadow-lg w-full">
            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
                <span>이력서</span>
                <button
                  className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-2xl mt-4"
                  onClick={() => fileInputRef.current.click()}
                >
                  PDF 파일 선택
                </button>
              </div>

              <div className="flex flex-col mb-4">
                <span>자소서</span>
                <button
                  className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-2xl mt-4"
                  onClick={() => fileInputRef.current.click()}
                >
                  PDF 파일 선택
                </button>
              </div>

              <div className="flex flex-col mb-4">
                <span>포트폴리오</span>
                <button
                  className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-2xl mt-4"
                  onClick={() => fileInputRef.current.click()}
                >
                  PDF 파일 선택
                </button>
              </div>
          </div>
        </div>    
        </div>
      </div>
    </Layout>
  );
}
