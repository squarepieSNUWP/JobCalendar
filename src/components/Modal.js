import { useState } from "react";

export default function Modal({ setModal, posts, setPosts }) {
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  function handleFormSubmit() {
    const startDate = startDateValue;
    const endDate = endDateValue;
    const postId = Math.random();

    if (!startDate ||
      !endDate ||
      !companyValue ||
      !jobValue ||
      !descriptionValue) {
      alert("빈 칸을 채워주세요");
      return;
    }

    // Check if company, job, and description values are empty
    if (startDate > endDate) {
      alert("시작 날짜는 마감 날짜 이전으로 선택해주세요");
      return;
    }


    if (startDate !== endDate) {
      const startDatePost = {
        id: postId,
        date: startDate,
        type: "start",
        company: companyValue,
        job: jobValue,
        description: descriptionValue,
      };
      const endDatePost = {
        id: postId,
        date: endDate,
        type: "end",
        company: companyValue,
        job: jobValue,
        description: descriptionValue,
      };

      setPosts((prevJobPosts) =>
        [...prevJobPosts, startDatePost, endDatePost]);
      setModal(false);
    
    } else if (startDate === endDate) {
      const sameDatePost = {
        id: postId,
        date: startDate,
        type: "same",
        company: companyValue,
        job: jobValue,
        description: descriptionValue,
      };

      setPosts((prevJobPosts) => [...prevJobPosts, sameDatePost]);
      setModal(false);
    }

    
  };

  return (
    <>
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-20"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-gray-200 p-8 rounded-lg shadow-md z-30 flex flex-col items-center">
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-col mb-3">
            <label htmlFor="start-date" className="mb-1">
              시작 날짜
            </label>
            <input
              type="date"
              id="start-date"
              className="text-sm bg-white px-1 w-1/3 h-8 rounded"
              onChange={(e) => {
                setStartDateValue(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="end-date" className="mb-1">
              마감 날짜
            </label>
            <input
              type="date"
              id="end-date"
              className="text-sm bg-white px-1 w-1/3 h-8 rounded"
              onChange={(e) => {
                setEndDateValue(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="company" className="mb-1">
              회사 이름
            </label>
            <input
              type="text"
              id="company"
              className="text-sm bg-white h-8 px-1 rounded"
              onChange={(e) => {
                setCompanyValue(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="job-title" className="mb-1">
              직무 이름
            </label>
            <input
              type="text"
              id="job-title"
              className="text-sm bg-white h-8 px-1 rounded"
              onChange={(e) => {
                setJobValue(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="description" className="mb-1">
              공고 내용
            </label>
            <textarea
              id="description"
              className="text-sm bg-white h-40 p-1 rounded"
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className="flex">
          <button className="py-2 px-4 text-sm font-semibold rounded-lg bg-teal-400 text-white cursor-pointer mx-1" onClick={handleFormSubmit}>
            등록
          </button>
          <button
            className="py-2 px-4 text-sm font-semibold rounded-lg bg-teal-400 text-white cursor-pointer mx-1"
            onClick={() => {
              setModal(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}