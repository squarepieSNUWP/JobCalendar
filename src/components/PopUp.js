import { deleteApply } from "@/api/apply";
import { useState } from "react";

export default function PopUp({
  setModalDetail,
  setPopUp,
  selectedPostId,
  selectedPostJobId,
  date,
  company,
  title,
  type,
  posts,
  setPosts,
  paperPosts,
  setPaperPosts
}) {

  // 모달과 마찬가지로 현재 화면 정중앙에 위치하도록, 대신 너비는 1/3로 설정
  const popup_container = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3
  bg-[#F3F0EE] pb-6 pt-8 pr-7 pl-7 rounded-3xl shadow-md z-40 flex flex-col
  z-50`;

  // 기존에 만들었던 버튼 css와 동일
  const btn = `py-2 px-4 text-sm font-semibold rounded-3xl bg-[#D6BCB0] 
  text-white cursor-pointer mx-1 place-self-end mt-4 hover:bg-[#B9A49A]`;


  async function handleDelete() {
    await deleteApply(selectedPostId);

    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== selectedPostId);
    });

    if (type === "paper") {
      setPaperPosts((prevPaperPosts) => {
        return prevPaperPosts.filter((paperPost) => paperPost.id !== selectedPostJobId);
      });
    }

    setModalDetail(false)

  }



  return (
    <div className={popup_container}>

      {/* 모달의 제목과 같은 css */}
      <h1 className="font-bold text-lg text-gray-800">일정 삭제</h1>

      {/* 일정 정보를 강조하기 위해 span 태그로 각 정보를 감사고 font-semibold 줌 */}
      <span className="mt-4">
        정말로 <span className="font-bold">{date}</span>로 예정된 <br /> <span className="font-bold">{company}</span>의 <span className="font-bold">{title}</span> 공고에 대한 <span className="font-bold">{type === "paper" ? "서류 제출" : "면접"}</span>
        일정을 삭제하시겠습니까?
      </span>

      {/* 안내문구 */}
      <span>일정을 지우더라도 공고별 서류 보관함과 회고록은 조회 가능합니다.</span>


      <div className="flex justify-center">
        <button
          className={btn}
          onClick={() => {
            setPopUp(false);
          }}
        >
          취소
        </button>

        {/* 취소 버튼에 비해 삭제 버튼이 더 강조되면 실수 방지가 되지 않을까...*/}
        <button
          className={btn}
          onClick={() => {
            handleDelete();
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}