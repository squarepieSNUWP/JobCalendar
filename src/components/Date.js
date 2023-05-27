'use client'
import { useState, useEffect } from "react";

export default function Date({ date, today, index, selectedYear, selectedMonth, firstDate, lastDate, posts, setPosts }) {

  let [differentMonth, setDifferentMonth] = useState(false);
  let [isToday, setIsToday] = useState(false);
  let [content, setContent] = useState([]);

  let isPrev = index < firstDate;
  let isNext = index > lastDate;

  useEffect(() => {
    if (isPrev || isNext) {
      setDifferentMonth(true);
    }

    if (selectedYear == today.year && selectedMonth == today.month && date == today.date) {
      setIsToday(true);
    }

    let matchingInputs = posts.filter((item) => {
      const [itemYear, itemMonth, itemDate] = item.deadline.split("-");
      if (!isPrev && !isNext) {
        return (
          Number(itemYear) == selectedYear &&
          Number(itemMonth) == selectedMonth &&
          Number(itemDate) == date
        )
      } else if (isPrev && selectedMonth == 1) {
        return (
          Number(itemYear) == selectedYear - 1 &&
          Number(itemMonth) == 12 &&
          Number(itemDate) == date
        )
      } else if (isNext && selectedMonth == 12) {
        return (
          Number(itemYear) == selectedYear + 1 &&
          Number(itemMonth) == 1 &&
          Number(itemDate) == date
        )
      } else if (isPrev) {
        return (
          Number(itemYear) == selectedYear &&
          Number(itemMonth) == selectedMonth - 1 &&
          Number(itemDate) == date
        )
      } else if (isNext) {
        return (
          Number(itemYear) == selectedYear &&
          Number(itemMonth) == selectedMonth + 1 &&
          Number(itemDate) == date
        )
      }
    });

    if (matchingInputs.length > 0) {
      const contents = matchingInputs;
      setContent(contents);
    } else {
      setContent([]);
    }

      
    return () => {
      setDifferentMonth("");
      setIsToday("");
    }
    }, [selectedMonth, selectedYear, posts]);



  return (
    <div className="h-24 border border-gray-700 text-gray-700 font-semibold text-sm transition duration-700 ease-in-out cursor-pointer flex flex-col relative hover:bg-gray-300">
      {isToday && <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-teal-400 z-1"></div>}
      <div
        className="flex justify-end relative pt-2 pr-2 z-2"
        style={{
          color: isToday ? "white" : differentMonth ? "grey" : null,
          fontWeight: isToday ? 600 : null,
        }}
      >
        {date}
      </div>
      {
        content.length > 0 &&
        (
          <div>
            {content.map((item) => {
              return (
                <div className="
                bg-teal-400 rounded-5 px-1 text-xs mx-1 my-0.5 flex items-baseline">
                  <span>{item.company}</span>
                </div>
              );
            })}
          </div>
        )
      }
      


    </div>
  );
}