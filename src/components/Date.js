'use client'
import { useState, useEffect } from "react";

export default function Date({ date, index, today, selectedYear, selectedMonth, posts, matchingPosts, postRange, indexRange, setIndexRange,highlight }) {
  let [content, setContent] = useState([]);

  useEffect(() => {

    if (matchingPosts.length > 0) {
      const contents = matchingPosts;
      setContent(contents);
    } else {
      setContent([]);
    }

    return () => {
    };
  }, [selectedYear, selectedMonth, posts]);

  return (
    <div className="h-24 border-2 text-gray-700 font-semibold text-sm transition duration-1000 ease-in-out cursor-pointer flex flex-col relative"
    style={{background: highlight ? 'teal' : null}}>
      <div
        className="w-full h-full absolute bg-zinc-100 z-20"
        style={{
          opacity: date.currentMonth ? 0 : 0.5,
        }}
      ></div>
      {
        date.y === today.y &&
        date.m === today.m &&
        date.d == today.d &&
        <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-teal-400 z-0">
        </div>
      }
      <div className="flex justify-end relative pt-2 pr-2 pb-1 z-10">{date.d}</div>

      {content.length > 0 && content.length <= 3 && (
        <>
          {content.slice(0, 3).map((item, index) => (
            <div
              className={`bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline ${date.currentMonth ? "z-30" : null}`}
              key={item.id}
              onMouseOver={() => {
                setIndexRange(
                  [postRange[index].startIndex, postRange[index].endIndex]
                )
                console.log(indexRange)
              }}
              onMouseLeave={() => { setIndexRange([])}}
              
            >
              <span className="bg-white my-0.5 mr-0.5 rounded-5">
                {item.type}
              </span>
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