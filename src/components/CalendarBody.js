'use client'

import { useState } from "react";
import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, getDates, posts, setPosts }) {
  const { dates, firstIndex, lastIndex } = getDates;

  const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
  const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
  const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
  const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;


  function getMatchingPosts(date, index) {
    let isPrev = index < firstIndex;
    let isNext = index > lastIndex;

    const matchingPosts = posts.filter((post) => {
      if (isPrev) {
        return post.date ==
          `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      } else if (isNext) {
        return post.date ==
          `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      } else {
        return post.date ==
          `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(date).padStart(2, "0")}`
      }
    })

    const matchingPostsWithIndex = matchingPosts.map((matchingPost) => {
      return { post: matchingPost, index };
    });

    return matchingPostsWithIndex || [];
  }

  return (
    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 items-center justify-center">
        {dates.map((date, index) => {
          const matchingPosts = getMatchingPosts(date, index);
  
          return (
            <Date
              key={index}
              date={date}
              index={index}
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              today={today}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              posts={posts}
              setPosts={setPosts}
              matchingPosts={matchingPosts}
            />
          );
        })}
      </div>
    </div>
  );
}