'use client'

import { useEffect, useState } from "react";
import Date from "./Date";
import Day from "./Day";

export default function CalendarBody(
  { weekdays,
    today,
    selectedYear,
    selectedMonth,
    dates,
    posts }) {
  
  const body_container =
    `w-full p-4 text-base flex flex-col border border-black rounded`;
  const dates_container = `w-full h-full grid grid-cols-7 grid-rows-[minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)] items-center justify-center`;
  
  
  const [indexRange, setIndexRange] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const [diff, setDiff] = useState(0)
  const [hoveredPost, setHoveredPost] = useState(null)

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
    const diff = dates[postIndex].diff
    const todayIndex = dates.findIndex((date) => {
      return (
        today.y === date.y &&
        today.m === date.m &&
        today.d === date.d
      )
    })

    if (todayIndex === -1 && todayIndex <= postIndex) {
      return { range: [todayIndex, postIndex], diff };
    } 

    if (todayIndex === -1) {
      return {range: [], diff}
    } 
    

    if (postIndex < todayIndex) {
      return {range: [], diff}
    }
    
    if (todayIndex <= postIndex) {
      return {range: [todayIndex, postIndex], diff}
    }
  }


  return (
    <div className={body_container}>
      <Day weekdays={weekdays} />

      <div className={dates_container}>
        {dates.map((date, index) => {
          const matchingPosts = getMatchingPosts(date);
          const postRange = matchingPosts.length > 0
            ? getPostRange(matchingPosts[0]) : {}
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
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              diff={diff}
              setDiff={setDiff}
              hoveredPost={hoveredPost}
              setHoveredPost={setHoveredPost}

            />
          );
        })}
      </div>
    </div>
  );
}