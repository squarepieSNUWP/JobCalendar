'use client'
import { useState, useEffect } from "react";

export default function Date({ date, today, index, selectedYear, selectedMonth, firstDate, lastDate, posts, setPosts }) {

  let [differentMonth, setDifferentMonth] = useState(false);
  let [isToday, setIsToday] = useState(false);
  let [content, setContent] = useState([]);

  let isPrev = index < firstDate;
  let isNext = index > lastDate;

  function getMatchingPosts() {
    const matchingPosts = posts.filter((item) => {
      const [itemYear, itemMonth, itemDate] = item.date.split("-");
      if (!isPrev && !isNext) {
        return (
          Number(itemYear) == selectedYear &&
          Number(itemMonth) == selectedMonth &&
          Number(itemDate) == date)
        
      } else if (isPrev && selectedMonth == 1) {
        return (
          Number(itemYear) == selectedYear - 1 &&
          Number(itemMonth) == 12 &&
          Number(itemDate) == date)
        
      } else if (isNext && selectedMonth == 12) {
        return (
          Number(itemYear) == selectedYear + 1 &&
          Number(itemMonth) == 1 &&
          Number(itemDate) == date)
        
      } else if (isPrev) {
        return (
          Number(itemYear) == selectedYear &&
          Number(itemMonth) == selectedMonth - 1 &&
          Number(itemDate) == date);
        
      } else if (isNext) {
        return (
          Number(itemYear) == selectedYear &&
          Number(itemMonth) == selectedMonth + 1 &&
          Number(itemDate) == date)
      }
    });
    return matchingPosts || []
  }

  useEffect(() => {
    if (isPrev || isNext) {
      setDifferentMonth(true);
    }

    if (selectedYear == today.year &&
      selectedMonth == today.month &&
      date == today.date) {
      setIsToday(true);
    }

    let matchingPosts = getMatchingPosts()
    if (matchingPosts.length > 0) {
      const contents = matchingPosts
      setContent(contents)
    } else {
      setContent([]);
    }

      
    return () => {
      setDifferentMonth("");
      setIsToday("");
    }
    }, [selectedMonth, selectedYear, posts]);



  return (
    <div className="h-24 border-2 text-gray-700 font-semibold text-sm transition duration-700 ease-in-out cursor-pointer flex flex-col relative hover:bg-gray-300">

      <div className="w-full h-full absolute bg-zinc-100 z-20" style={{ opacity: differentMonth ? 0.5 : 0 }}></div>
      {isToday && <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-teal-400 z-0"></div>}
      <div
        className="flex justify-end relative pt-2 pr-2 pb-1 z-10"
        style={{
          color: isToday ? "white" : null,
          fontWeight: isToday ? 600 : null,
        }}
      >
        {date}
      </div>

      {content.length > 0 && content.length <= 3 && (
        <>
          {content.slice(0, 3).map((item) => (
            <div className={`bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline ${!differentMonth ? 'z-30' : null}`} key={item.id}>
              <span className="bg-white my-0.5 mr-0.5 rounded-5">
                {item.type}
              </span>
              <span>
                {item.company}
              </span>
            </div>
          ))}
        </>
      )}

      {content.length > 3 && (
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
      )}
    </div>
  );
}