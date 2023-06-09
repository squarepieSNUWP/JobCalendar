import { useState } from "react";
import ModalDetail from "./ModalDetail";

export default function Date(
  { date,
    index,
    today,
    selectedYear,
    selectedMonth,
    posts,
    setPosts,
    paperPosts,
    setPaperPosts,
    matchingPosts,
    postRange,
    indexRange,
    setIndexRange,
    highlight,
    isHovered,
    setIsHovered,
    diff,
    setDiff,
    hoveredPost,
    setHoveredPost,
    todayIndex
  }) {
    
    // 날짜 한 칸을 감사는 box로
    // min-h-full로 dates-wrapper에서 각 그리드의 최소 높이로 설정한 px만큼 높이를 갖도록 함
    // 경계는 border-2 두께만큼,
    // 하위의 모든 글자(날짜, 일정 등)는 굵기 semibold에 크기 sm으로 설정
    // 하위 모든 요소를 flex-col로 배치
    // 색칠 되었을 때 배경색은 teal-700
    // position은 relative로 두어서 밑에 date_today의 위치를 조절할 수 있게 함
    const date_box = `min-h-full overflow-hidden border-t border-r border-1 text-gray-700 font-semibold 
    text-sm transition duration-300 ease-in-out cursor-pointer flex flex-col relative hover:bg-[#EEE1DC]/40
    ${highlight ? " bg-[#EEE1DC]" : ""} `;
  

    // 다른달인지 파악해 date_box의 투명도를 조절하는 css
    // date_box의 바로 밑 자식 div로 만들어 기존 css의 :before과 비슷한 역할로 만듦
    // const date_box_opacity =
    //   `w-full h-full absolute bg-zinc-100 z-20
    //   ${date.currentMonth ? 'opacity-0' : 'opacity-50'}`;

    // 오늘인 경우에 date_box의 우측 상단에 위치하도록 함
    // 날짜가 한 글자(ex. 3)인지 두 글자(ex. 10)에 따라 우측 위치를 살짝 조정
    // teal-400을 배경색으로 함
    // z-0으로 가장 하단에 위치
    // 이번달이면 원래 색, 아니지만 마우스 오버되면 원래 색, 이번달 아니면 투명도 50%
    const date_today = `absolute top-2.5 
    ${date.d.toString().length == 2 ? "right-3" : "right-2"} 
    w-6 h-6 rounded-full z-0
    ${date.currentMonth ? "bg-[#EEE1DC]" : "bg-[#EEE1DC]/60"} `;

    // 날짜의 숫자를 보여주는 div칸의 css로 date_box에서 우측 정렬함
    // 위의 date_today와 위치를 맞추기 위해 여백을 조정함
    // 오늘 표시 바로 위에 오게 z-10으로 위치
    const date_num = `flex justify-end pt-2.5 pr-4 pb-1 z-10
  ${date.currentMonth ? "" : "text-gray-600/50"}`;

    // 일정 하나씩 담는 box로, type(서류/면접)과 내용(회사 이름)을 감싸는 역할
    // 마진과 패딩은 일정을 구분할 수 있게 상하좌우로 살짝씩 줌
    {/*const post_box = `mx-1 px-0 pb-1 text-xs my-0.5 flex items-baseline rounded-2xl text-[#444444]
  ${date.currentMonth ? "bg-[#EEE1DC]" : highlight ? "bg-[#EEE1DC]" : "bg-[#EEE1DC]/50"}`;*/}

    const post_box = `post-box` ;

    // 일정의 상태(서류/면접)을 나타내는 부분의 css
    const post_type = `mt-0.5 mr-1.5 ml-1 px-1.5 text-[#91807B] rounded-2xl
     ${date.currentMonth ? "bg-white" : highlight ? "bg-white" : "bg-white"}`;

    const post_text = `${date.currentMonth ? "" : highlight ? "" : "text-gray-700/20"}`;

    // 마우스 오버했을 때 오늘 날짜 또는 달력 첫번째 칸에서 보여줄 d-day에 관한 css
    // date_box_opacity처럼 기존 css의 :before처럼 만듦
    const d_day_box = `w-full h-full absolute flex items-center justify-center text-2xl font-bold text-white`;

    const [modalDetail, setModalDetail] = useState(false)
    const [selectedPost, setSelectedPost] = useState({})
  
  
    return (
      <div className={date_box}>
        {/* 일정에 마우스 오버했을 때 오늘 날짜 칸에 d_day_box를 생성함
      diff가 일정과 오늘 사이의 날짜 차이를 의미 */}
        {isHovered && index == todayIndex && <div className={d_day_box}>D - {diff}</div>}

        {/* 이번달인지 아닌지에 따라 투명도를 결정하는 date_box_opacity를 생성함 */}
        {/* <div className={date_box_opacity}></div> */}

        {/* 오늘인 경우 날짜 위에 오늘 표시의 원을 생성함 */}
        {date.y === today.y && date.m === today.m && date.d == today.d && <div className={date_today}></div>}

        {/* 위의 세 요소는 absolute로 date_box의 하위 요소가 아닌 반면
      date_num이 flex-col의 첫번째 요소!! */}
        <div className={date_num}>{date.d}</div>

        {/* 각 달력의 날짜와 일치하는 일정들을 저장한 matchingPosts를 순회하며 각 일정을 출력 
      ex. 2023-6-3
      matchingPosts = [
        {id: 1, date: '2023-06-03', ...}, 
        {id: 2, date: '2023-06-03', ...}, 
        {id: 3, date: '2023-06-03', ...}
      ]
      */}
        {matchingPosts?.length > 0 && (
          <>
            {matchingPosts.map((item, index) => (
              <div
                className={`${post_box} relative ${isHovered ? "z-40" : ""}`}
                key={item.id}
                onMouseEnter={() => {
                  // 마우스 오버 하면 상위 컴포넌트로 다음의 값들 전달
                  // 1) [오늘 인덱스, 일정 인덱스]를 indexRange로 전달
                  // -> CalendarBody에서 다시 인덱스 범위에 속한 날짜들을 highlight 불리언으로 전달
                  // -> highlight라면 배경색을 변경하는 원리로 애니메이션 구현
                  // 2) 마우스 오버 상태(true, false)를 isHovered로 전달
                  // 3) 일정과 오늘 사이의 일자 차이를 diff로 전달
                  // 4) 마우스 오버한 일정을 hoveredPost로 전달
                  setIndexRange(postRange.range);
                  setIsHovered(true);
                  setDiff(postRange.diff);
                  setHoveredPost({ ...item });
                }}
                onMouseLeave={() => {
                  setIndexRange([]);
                  setIsHovered(false);
                  setDiff(0);
                  setHoveredPost(null);
                }}
                onClick={() => {
                  setModalDetail(true);
                  setSelectedPost({ ...item });
                }}
                // hoveredPost가 마우스 오버할 때만 정의되기 때문에
                // inline style로 다른 일정 사라지는 애니메이션 구현
                style={{
                  opacity: hoveredPost === null || item.id == hoveredPost.id ? 1 : 0,
                }}
              >
                <span className={post_type}>{item.type == "paper" ? "서류" : "면접"}</span>
                <span className="post-box-text">
                  {item.company.length > 7
                    ? item.company.slice(0, 7) + "..." : item.company}
                </span>
                {/* absolute 속성을 이용해 post_box를 기준으로 바로 위에 위치하도록 조정
                너비는 post_box와 같도록 하고 높이는 최소한 post_box는 가지도록 함. background, text-color, border은 임의로 설정함
                */}
                {isHovered && item.company.length > 7 && (
                  <div className={`absolute flex items-center justify-center text-center w-full min-h-full 
                  ${item.company.length < 16 ? "-top-3/4" : "-top-full"} left-1/2 transform -translate-x-1/2 -translate-y-1/3 px-0.5 
                  bg-white border border-gray-300 rounded text-xs text-gray-700 shadow-md`}>
                    {item.company}
                  </div>
                )}

                {/* {item.company.length > 7 && (
  <span className={`post-box-after ${item.company.length > 7 && 'hidden'}`}>
    {item.company.slice(7)}
  </span>
)} */}
              </div>
            ))}
          </>
        )}

        {/* {content.length > 3 && (
        <>
          {content.slice(0, 2).map((item) => (
            <div className="bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline" key={item.id}>
              <span></span>
              <span>{item.company}</span>
            </div>
          ))}
          <div className="bg-transparent px-1 text-xs mx-0.5 my-0.5">
            <span>...외 {content.length - 2}개</span>
          </div>
        </>
      )} */}

        {modalDetail && <ModalDetail setModalDetail={setModalDetail} selectedPost={selectedPost} posts={posts} setPosts={setPosts} paperPosts={paperPosts} setPaperPosts={setPaperPosts} />}
      </div>
    );
  }

  