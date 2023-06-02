'use client'

import { useEffect, useState } from "react";
import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, dates, posts }) {
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


  function getPostIndex(post) {
    const [postYear, postMonth, postDate] = post.date.split("-");
    const index = dates.findIndex((date) => {
      return (
        Number(postYear) === date.y &&
        Number(postMonth) === date.m &&
        Number(postDate) === date.d
      )
    })
    return index;
  }


  function getPostRange(post) {
    const postIndex = getPostIndex(post)
    const todayIndex = dates.findIndex((date) => {
      return (
        today.y === date.y &&
        today.m === date.m &&
        today.d === date.d
      )
    })
    if (todayIndex === -1) {
      return []
    } 
    
    if (postIndex < todayIndex) {
      return []
    
    }
    
    if (todayIndex <= postIndex) {
      return [todayIndex, postIndex]
    }
  }


  return (
    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 items-center justify-center">
        {dates.map((date, index) => {
          const matchingPosts = getMatchingPosts(date);
          const postRange = matchingPosts.length > 0
            ? getPostRange(matchingPosts[0]) : []
          // const postRange = matchingPosts.map((post) => getPostRange(post));
  
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
              postRange={postRange}
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