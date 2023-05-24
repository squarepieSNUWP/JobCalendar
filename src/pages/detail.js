import React, { useRef } from 'react';

export default function Detail() {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // 선택한 파일을 업로드하거나 처리하는 로직을 추가하세요
    console.log('Uploaded file:', file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => fileInputRef.current.click()}
      >
        PDF 파일 선택
      </button>
    </div>
  );
}
