'use client'

import { useState } from "react";
import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, getDates, posts, setPosts }) {
  const { dates, firstIndex, lastIndex } = getDates;

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

    // const matchingPostsWithIndex = matchingPosts.map((matchingPost) => {
    //   return { post: matchingPost, index };
    // });

    // return matchingPostsWithIndex || [];
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