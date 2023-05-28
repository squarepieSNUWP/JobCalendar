import { useState } from "react";

export default function Modal({ setModal, posts, setPosts }) {
  const [deadlineValue, setDeadlineValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  function handleFormSubmit() {
    const newJobPost = {
      id: Math.random(),
      deadline: deadlineValue,
      company: companyValue,
      job: jobValue,
      description: descriptionValue,
    };
    setPosts((prevJobPost) => [...prevJobPost, newJobPost]);
    setModal(false);
  };

  return (
    <>
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-20"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-gray-200 p-8 rounded-lg shadow-md z-30 flex flex-col items-center">
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-col mb-3">
            <label htmlFor="date" className="mb-1">
              마감 날짜
            </label>
            <input
              type="date"
              id="date"
              className="text-sm bg-white px-1 w-1/3 h-8 rounded"
              onChange={(e) => {
                setDeadlineValue(e.target.value);
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

        <div
          className="flex">
          <button
            className="py-2 px-4 text-sm font-semibold rounded-lg bg-teal-400 text-white cursor-pointer mx-1" onClick={handleFormSubmit}>
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