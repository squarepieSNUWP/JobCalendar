import { useState } from "react";

export default function Modal({ setModal, posts, setPosts }) {
  const background =
    `fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-30`;
  
  const modal_container =
    `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-gray-200 p-8 rounded-lg shadow-md z-40 flex flex-col items-center`;
  
  const input_container = `w-full h-full flex flex-col`;
  
  const input_wrapper = `flex mb-3`;
  
  const input_box = `text-sm bg-white px-1 rounded`;

  const type_radio_wrapper = `flex items-center mr-4`;
  
  const type_radio = `appearance-none 
    bg-white rounded-xl checked:bg-teal-400 w-4 h-4 cursor-pointer`;
  
  const btn = `py-2 px-4 text-sm font-semibold rounded-lg bg-teal-400 text-white cursor-pointer mx-1`;
  


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
      <div className={background}></div>

      <div className={modal_container}>
        <div className={input_container}>
          <div class={input_wrapper}>
            <div class={type_radio_wrapper}>
              <input
                id="radio-paper"
                type="radio"
                className={type_radio}
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

            <div class={type_radio_wrapper}>
              <input
                id="radio-interview"
                type="radio"
                className={type_radio}
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

          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="date" className="mb-1">
              {selectedOption == "paper" ? "서류 제출일" : "면접일"}
            </label>
            <input
              type="date"
              id="date"
              className={`${input_box} w-1/3 h-8`}
              onChange={(e) => {
                setDateValue(e.target.value);
              }}
            />
          </div>

          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="company" className="mb-1">
              회사 이름
            </label>
            <input
              type="text"
              id="company"
              className={`${input_box} h-8`}
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
              className={`${input_box} h-40`}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className="flex">
          <button className={btn} onClick={handleFormSubmit}>
            등록
          </button>
          <button
            className={btn}
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