import { useState } from "react";

export default function Modal({ setModal, posts, setPosts }) {
  const [selectedOption, setSelectedOption] = useState("paper");
  const [dateValue, setDateValue] = useState("")
  const [companyValue, setCompanyValue] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  function handleFormSubmit() {
    const postId = Math.random();

    if (!date ||
      !companyValue ||
      !jobValue ||
      !descriptionValue) {
      alert("빈 칸을 채워주세요");
      return;
    }
    const newPost = {
      id: postId,
      date: dateValue,
      type: selectedOption,
      company: companyValue,
      job: jobValue,
      description: descriptionValue,
    };

    setPosts((prevJobPosts) => [...prevJobPosts, newPost]);
    setModal(false);
    }

  return (
    <>
      <div className=" fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-30"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-gray-200 p-8 rounded-lg shadow-md z-40 flex flex-col items-center">
        <div className="w-full h-full flex flex-col">
          <div class="flex mb-3">
            <div class="flex items-center mr-4">
              <input
                id="radio-paper"
                type="radio"
                className="appearance-none bg-white rounded-xl checked:bg-teal-400 w-4 h-4 cursor-pointer"
                value="paper"
                name="type"
                checked={selectedOption === "paper"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }}
              />
              <label for="radio-paper" className="ml-2 text-sm">
                서류
              </label>
            </div>

            <div class="flex items-center mr-3">
              <input
                id="radio-interview"
                type="radio"
                className="appearance-none bg-white rounded-xl checked:bg-teal-400 w-4 h-4 cursor-pointer"
                value="interview"
                name="type"
                checked={selectedOption === "interview"}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                }}
              />
              <label for="radio-interview" className="ml-2 text-sm">
                면접
              </label>
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="date" className="mb-1">
              {selectedOption == 'paper' ? '서류 제출일' : '면접일'}
            </label>
            <input
              type="date"
              id="date"
              className="text-sm bg-white px-1 w-1/3 h-8 rounded"
              onChange={(e) => {
                setDateValue(e.target.value);
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