import { useState } from "react";

export default function Modal({
  setModalInterview, posts, setPosts, paperPosts, setPaperPosts
}) {
  // 모달 창 바깥의 검은색 배경(bg-black에 opacity-50으로 설정)
  // Date 컴포넌트에 z-index가 20까지 존재해 30으로 설정
  const background = `fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-30`;

  // 모달창의 가장 바깥 부분으로 검은 배경보다 위에 오도록 z-index는 40으로 설정
  // 일단은 전체 스크린 너비와 높이의 절반으로 설정
  // input 컨테이너와 button 컨테이너를 flex-col로 정렬
  const modal_container = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-gray-200 p-8 rounded-lg shadow-md z-40 flex flex-col items-center`;

  // input 컨테이너로 서류/면접, 날짜, 회사 이름, 직무 이름, 공고 내용이 모두 들어간 공간
  // cf. button 컨테이너는 flex만 주었기에 inline으로 className에 기입함
  const input_container = `w-full h-full flex flex-col`;

  // 각각의 input-label을 감싸는 wrapper로 밑 여백만 주었음
  const input_wrapper = `flex mb-3`;

  // 날짜, 회사 이름, 직무 이름, 공고 내용의 input 란의 크기 및 내부 텍스트를 조절
  // 너비와 크기는 inline으로 className에 추가했기에 여기는 공통된 부분만 설정함
  // cf. 라벨에 대한 css는 단순해서 일단 inline으로 className에 추가함
  const input_box = `text-sm bg-white px-1 rounded`;

  // 서류 라디오 버튼과 면접 라디오 버튼을 각각 감싸는 wrapper로 오른쪽 여백을 줌
  const type_radio_wrapper = `flex items-center mr-4`;

  // 라디오 버튼을 꾸미는 css로,
  // 반드시 appearance-none을 해준 후에 bg, border, text를 설정해야 변경됨
  // 체크 된 이후엔 checked: 후에 원하는 스타일 적으면 됨
  const type_radio = `appearance-none 
    bg-white rounded-xl checked:bg-teal-400 w-4 h-4 cursor-pointer`;

  // 등록과 닫기 버튼에 대한 css로 이는 Calendar 컴포넌트의 공고 등록 버튼과 동일
  const btn = `py-2 px-4 text-sm font-semibold rounded-lg bg-teal-400 text-white cursor-pointer mx-1`;

  // const [selectedOption, setSelectedOption] = useState("paper");
  // const [paperPosts, setPaperPosts] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("new");
  const selectedPaperPost =
    selectedJobId !== "new" ? findPostByJobId(selectedJobId) : ""

  const [dateValue, setDateValue] = useState("");
  const [companyValue, setCompanyValue] = useState("")
  const [jobValue, setJobValue] = useState("");
  const [postLinkValue, setPostLinkValue] = useState("");

  function findPostByJobId(selectedJobId) {
    return paperPosts.find((p) => p.jobId === selectedJobId);
  }

  // 등록 버튼을 눌렀을 때 일정 정보를 객체로 만들어 Calendar 컴포넌트의 posts에 업데이트하는 함수
  function handleFormSubmit() {
    // 빈 칸이 존재한다면 alert 창 띄움
    if (!selectedPaperPost
      && (!dateValue || !companyValue || !jobValue || !postLinkValue)) {
      alert("빈 칸을 채워주세요");
      return;
    }

    const newPost = {
      jobId: selectedPaperPost ? selectedJobId : Math.random().toString(36).substring(2, 11),
      date: dateValue,
      type: "interview",
      company: selectedPaperPost ? selectedPaperPost.company : companyValue,
      job: selectedPaperPost ? selectedPaperPost.job : jobValue,
      postLink: selectedPaperPost ? selectedPaperPost.postLink : postLinkValue?.trim(),
    };

    const isAlreadyRegistered = posts.some((post) => {
      return (
        post.type === newPost.type &&
        post.company === newPost.company &&
        post.job === newPost.job &&
        post.postLink === newPost.postLink
      )
    });

    if (isAlreadyRegistered) {
      alert("이미 등록된 면접입니다.");
      return;
    }

    fetch("api/post/new", {
      method: "POST",
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        newPost.id = data;
        setPosts((prevJobPosts) => [...prevJobPosts, newPost]);
        setModalInterview(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className={background}></div>

      <div className={modal_container}>
        <h1>면접일 설정</h1>
        <div className={input_container}>
          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="paper-post" className="mb-1">
              서류 일정 불러오기
            </label>
            <select
              id="paper-post"
              className={`${input_box}  w-1/3 h-8`}
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
              }}
            >
              <option value="new" selected>
                직접 입력하기
              </option>
              {paperPosts &&
                paperPosts.map((post, i) => {
                  return (
                    <option key={i} value={post.jobId} selected={selectedJobId === post.jobId}>
                      {post.company}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* <div class={input_wrapper}>
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
            </div> */}

          <div className={`${input_wrapper} flex-col`}>
            <label htmlFor="date" className="mb-1">
              {/* {selectedOption == "paper" ? "서류 제출일" : "면접일"} */}
              면접 예정일
            </label>
            <input
              type="date"
              id="date"
              className={`${input_box} w-1/3 h-8`}
              min={selectedPaperPost ? selectedPaperPost.date : undefined}
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
              className={`${input_box} h-8 
              disabled:bg-gray-100 disabled:text-gray-700/50`}
              defaultValue={selectedPaperPost ? selectedPaperPost.company : ""}
              disabled={!!selectedPaperPost}
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
              className={`${input_box} h-8
              disabled:bg-gray-100 disabled:text-gray-700/50`}
              defaultValue={selectedPaperPost ? selectedPaperPost.job : ""}
              disabled={!!selectedPaperPost}
              onChange={(e) => {
                setJobValue(e.target.value);
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
              className={`${input_box} h-8 
              disabled:bg-gray-100 disabled:text-gray-700/50`}
              defaultValue={selectedPaperPost ? selectedPaperPost.postLink : ""}
              disabled={!!selectedPaperPost}
              onChange={(e) => {
                setPostLinkValue(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="flex">
          <button className={btn} onClick={handleFormSubmit}>
            등록
          </button>
          <button
            className={btn}
            onClick={() => {
              setModalInterview(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}