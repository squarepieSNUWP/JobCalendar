'use client'
import { useState, useEffect } from "react";

export default function Date({ type, date, index, today, selectedYear, selectedMonth, posts, setPosts, matchingPosts }) {
  let [isDifferentMonth, setIsDifferentMonth] = useState(false);
  let [isToday, setIsToday] = useState(false);
  let [content, setContent] = useState([]);

  useEffect(() => {
    if (type === 'prev' || type === 'next') {
      setIsDifferentMonth(true)
    }

    if (selectedYear == today.year &&
      selectedMonth == today.month &&
      date == today.date) {
      setIsToday(true);
    }

    if (matchingPosts.length > 0) {
      const contents = matchingPosts;
      setContent(contents);
    } else {
      setContent([]);
    }

    return () => {
      setIsDifferentMonth("")
      setIsToday("")
    }
       
  }, [selectedYear, selectedMonth, posts])
  

  return (
    <div className="h-24 border-2 text-gray-700 font-semibold text-sm transition duration-700 ease-in-out cursor-pointer flex flex-col relative">
      <div
        className="w-full h-full absolute bg-zinc-100 z-20"
        style={{
          opacity: isDifferentMonth ? 0.5 : 0
          // backgroundColor: isHighlighted ? "red" : null,
        }}
      ></div>
      {isToday && <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-teal-400 z-0"></div>}
      <div
        className="flex justify-end relative pt-2 pr-2 pb-1 z-10"
      >
        {date}
      </div>

      {content.length > 0 && content.length <= 3 && (
        <>
          {content.slice(0, 3).map((post) => (
            <div className={`bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline ${!isDifferentMonth ? "z-30" : null}`} key={post.id}>
              {/* onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} */}
              <span className="bg-white my-0.5 mr-0.5 rounded-5">{post.type}</span>
              <span>{post.company}</span>
            </div>
          ))}
        </>
      )}

      {content.length > 3 && (
        <>
          {content.slice(0, 2).map((post) => (
            <div className="bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline" key={post.id}>
              <span></span>
              <span>{post.company}</span>
            </div>
          ))}
          <div className="bg-transparent px-1 text-xs mx-0.5 my-0.5">
            <span>...외 {content.length - 2}개</span>
          </div>
        </>
      )}
    </div>
  );
}