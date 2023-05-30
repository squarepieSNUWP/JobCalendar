'use client'

import { useEffect, useState } from "react";
import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, getDates, posts }) {
  const { dates, firstIndex, lastIndex } = getDates;
  const [indexRange, setIndexRange] = useState([])

  function getMatchingPosts(date) {
    const matchingPosts = posts.filter((post) => {
      const [postYear, postMonth, postDate] = post.date.split('-')
      return (
        Number(postYear) === date.y &&
        Number(postMonth) === date.m &&
        Number(postDate) === date.d
      )
    })

    return matchingPosts
  }


  return (
    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 items-center justify-center">
        {dates.map((date, index) => {
          const matchingPosts = getMatchingPosts(date);
  
          return (
            <Date
              key={index}
              date={date}
              index={index}
              today={today}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              posts={posts}
              matchingPosts={matchingPosts}
              indexRange={indexRange}
              setIndexRange={setIndexRange}
              highlight={index >= indexRange[0] && index <= indexRange[1]}
            />
          );
        })}
      </div>
    </div>
  );
}