import { createApply, updateApply } from "@/api/apply";
import { createJob, updateJobInfo } from "@/api/job";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PopUp from "./PopUp";

export default function ModalDetail({
  setModalDetail,
  selectedPost,
  posts,
  setPosts,
  paperPosts,
  setPaperPosts
}) {
  // 모달 창 바깥의 검은색 배경(bg-black에 opacity-50으로 설정)
  // Date 컴포넌트에 z-index가 20까지 존재해 30으로 설정
  const background = `fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-30`;

  // 모달창의 가장 바깥 부분으로 검은 배경보다 위에 오도록 z-index는 40으로 설정
  // 일단은 전체 스크린 너비와 높이의 절반으로 설정
  // input 컨테이너와 button 컨테이너를 flex-col로 정렬
  const modal_container = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 
  bg-[#F3F0EE] pb-6 pt-8 pr-7 pl-7 rounded-3xl shadow-md z-40 flex flex-col`;

  // input 컨테이너로 서류/면접, 날짜, 회사 이름, 직무 이름, 공고 내용이 모두 들어간 공간
  // cf. button 컨테이너는 flex만 주었기에 inline으로 className에 기입함
  const input_container = `w-full h-full flex flex-col mt-5`;

  // 각각의 input-label을 감싸는 wrapper로 밑 여백만 주었음
  const input_wrapper = `flex mb-2`;

  // 날짜, 회사 이름, 직무 이름, 공고 내용의 input 란의 크기 및 내부 텍스트를 조절
  // 너비와 크기는 inline으로 className에 추가했기에 여기는 공통된 부분만 설정함
  // cf. 라벨에 대한 css는 단순해서 일단 inline으로 className에 추가함
  const input_box = `text-sm bg-white focus:outline-none 
  focus:ring focus:ring-[#D6BCB0]/30 px-1 rounded-xl px-3`;

  // 서류 라디오 버튼과 면접 라디오 버튼을 각각 감싸는 wrapper로 오른쪽 여백을 줌
  const type_radio_wrapper = `flex mr-4`;

  // 라디오 버튼을 꾸미는 css로,
  // 반드시 appearance-none을 해준 후에 bg, border, text를 설정해야 변경됨
  // 체크 된 이후엔 checked: 후에 원하는 스타일 적으면 됨
  const type_radio = `appearance-none 
    bg-white rounded-xl checked:bg-teal-400 w-4 h-4 cursor-pointer`;

  // 등록과 닫기 버튼에 대한 css로 이는 Calendar 컴포넌트의 공고 등록 버튼과 동일
  const btn = `py-2 px-4 text-sm font-semibold rounded-3xl bg-[#D6BCB0] 
  text-white cursor-pointer mx-1 place-self-end mt-4 hover:bg-[#B9A49A]`;

  const { data: session } = useSession();
  const userId = session.user.id;
  const [dateValue, setDateValue] = useState(selectedPost.date);
  const [companyValue, setCompanyValue] = useState(selectedPost.company);
  const [titleValue, setTitleValue] = useState(selectedPost.title);
  const [linkValue, setLinkValue] = useState(selectedPost.link);

  // 수정(연필 모양을 클릭) 여부를 판별하는 state
  const [isEditing, setIsEditing] = useState(false)
  // 삭제 팝업 여닫힘 state
  const [popUp, setPopUp] = useState(false)

  async function handleEdit() {
    const editedPost = {
      id: selectedPost.id,
      jobId: selectedPost.jobId,
      date: dateValue,
      company: companyValue,
      title: titleValue,
      link: linkValue
    }

    await updateApply(editedPost)
    await updateJobInfo(editedPost)

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === selectedPost.id) {
          return {
            ...post,
            date: dateValue,
            company: companyValue,
            title: titleValue,
            link: linkValue
          };
        }
        if (post.jobId === selectedPost.jobId &&
            post.type !== selectedPost.type) {
          return {
            ...post,
            company: companyValue,
            title: titleValue,
            link: linkValue,
          };
          }

        return post;
      });
    });

    if (selectedPost.type == "paper") {
      setPaperPosts((prevPaperPosts) => {
        return prevPaperPosts.map((paperPost) => {
          if (paperPost.id === selectedPost.jobId) {
            return {
              ...paperPost,
              date: dateValue,
              company: companyValue,
              title: titleValue,
              link: linkValue
            };
          }
          return paperPost;
        });
      });
    }
    
    setIsEditing(false)
  }


  return (
    <>
      {/* 현재 bg가 z-30, 모달이 z-40, 팝업이 z-50이라, 삭제 팝업창이 뜰 때 모달 bg가 모달 위에 올 수 있도록 popUp이 열리면 z-50으로 설정함 */}
      <div className={`${background} ${popUp ? "z-50" : null}`}></div>

      <div className={modal_container}>
        <h1 className="font-bold text-lg text-gray-800">
          {selectedPost.type === "paper" ? "서류 일정" : "면접 일정"}
        </h1>

        <div className={input_container}>
          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="date" className="mb-1">
              {selectedPost.type === "paper" ? "서류 제출 예정일" : "면접 예정일"}
            </label>
            {/* <span className="text-sm text-gray-600/90">dasd</span> */}
            <div>
              <input
                type="date"
                id="date"
                className={`${input_box} w-1/3 h-8`}
                value={dateValue}
                disabled={!isEditing}
                onChange={(e) => {
                  setDateValue(e.target.value);
                }}
              />
              {/* 날짜 input 옆에 연필(수정 아이콘)을 배치했으며
              클릭해 수정 중이라면 체크(확인 아이콘)과 엑스(취소 아이콘)가 등장하도록 함
              수정 완료되면(확인이나 취소 모두) 다시 연필 상태로 돌아감
              */}
              {!isEditing && (
                <span
                  className={`${btn} ml-2`}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  ✎
                </span>
              )}

              {isEditing && (
                <>
                  <span
                    className={`${btn} ml-2`}
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    ✔︎
                  </span>
                  <span
                    className={`${btn} ml-2`}
                    onClick={() => {
                      setDateValue(selectedPost.date);
                      setCompanyValue(selectedPost.company);
                      setTitleValue(selectedPost.title);
                      setLinkValue(selectedPost.link);
                      setIsEditing(false);
                    }}
                  >
                    ✘
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="company" className="mb-1">
              회사 이름
            </label>
            <input
              type="text"
              id="company"
              className={`${input_box} h-8`}
              value={companyValue}
              disabled={!isEditing}
              onChange={(e) => {
                setCompanyValue(e.target.value);
              }}
            />
          </div>

          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="job-title" className="mb-1">
              직무 이름
            </label>
            <input
              type="text"
              id="job-title"
              className={`${input_box} h-8`}
              value={titleValue}
              disabled={!isEditing}
              onChange={(e) => {
                setTitleValue(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="postLink" className="mb-1">
              공고 링크
            </label>
            <input
              type="text"
              id="postLink"
              className={`${input_box} h-8`}
              value={linkValue}
              disabled={!isEditing}
              onChange={(e) => {
                setLinkValue(e.target.value);
              }}
            ></input>
          </div>
        </div>
        
        {/* 자세히 보기, 삭제, 닫기 버튼 */}
        <div className="flex place-self-end">
          {/* 수정 중일 땐 자세히 보기를 숨김 */}
          {!isEditing && (
            <a href={`/detail/${selectedPost.jobId}`} className={btn}>
              자세히 보기
            </a>
          )}

          {/* 삭제 팝업창을 뜨게 하는 버튼 */}
          <button
            className={btn}
            onClick={() => {
              setPopUp(true);
            }}
          >
            삭제
          </button>
          
          {/* 클릭 시 달력으로 돌아가는 버튼 */}
          <button
            className={btn}
            onClick={() => {
              setModalDetail(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
      
      {/* 현재는 bg, 모달, 팝업을 형제 요소로 정의함 */}
      {popUp && (
        <PopUp
          setModalDetail={setModalDetail}
          setPopUp={setPopUp}
          selectedPostId={selectedPost.id}
          selectedPostJobId={selectedPost.jobId}
          date={dateValue}
          company={companyValue}
          title={titleValue}
          type={selectedPost.type}
          posts={posts}
          setPosts={setPosts}
          paperPosts={paperPosts}
          setPaperPosts={setPaperPosts}
        />
      )}
    </>
  );
}
