'use client'

export default function Date(
  { date,
    index,
    today,
    selectedYear,
    selectedMonth,
    posts,
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
  
  const date_box =
    `min-h-full overflow-hidden border-2 text-gray-700 font-semibold text-sm transition duration-1000 ease-in-out cursor-pointer flex flex-col relative`;
  
  // 다른달인지 파악해 date_box의 투명도를 조절하는 css
  const date_box_opacity = `w-full h-full absolute bg-zinc-100 z-20`;
  
  const date_today =
    `absolute top-2 
    ${date.d.toString().length == 2 ? "right-1.5" : "right-0.5"} 
    w-6 h-6 rounded-full bg-teal-400 z-0`;
  
  const date_num = `flex justify-end relative pt-2.5 pr-2.5 pb-1 z-10`;

  const post_box =
    `bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline 
    ${date.currentMonth ? "z-30" : "z-10"}`
  
  const post_type = `bg-white my-0.5 mr-0.5 rounded-5`;

  const d_day_box =
    `w-full h-full absolute flex items-center justify-center text-lg text-white`

  return (
    <div className={date_box} style={{ background: highlight ? "teal" : null }}>
      {isHovered && index == todayIndex&& 
        <div className={d_day_box}>
          D - {diff}
        </div>}
      <div
        className={date_box_opacity}
        style={{
          opacity: date.currentMonth ? 0 : 0.5,
        }}
      ></div>

      {date.y === today.y && date.m === today.m && date.d == today.d &&
        <div className={date_today}></div>}
      <div className={date_num}>{date.d}</div>

      {matchingPosts?.length > 0 && (
        <>
          {matchingPosts.map((item, index) => (
            <div
              className={post_box}
              key={item.id}
              onMouseEnter={() => {
                setIndexRange(postRange.range);
                setIsHovered(true);
                setDiff(postRange.diff)
                setHoveredPost({ ...item });
              }}
              onMouseLeave={() => {
                setIndexRange([]);
                setIsHovered(false);
                setDiff(0)
                setHoveredPost(null);
              }}
              style={{
                opacity: hoveredPost === null || item.id == hoveredPost.id ? 1 : 0,
              }}
            >
              <span className={post_type}>{item.type}</span>
              <span>{item.company}</span>
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
    </div>
  );
}