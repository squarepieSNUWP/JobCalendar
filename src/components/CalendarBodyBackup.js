"use client";

import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, dates, posts, setPosts }) {
  // let last = [31, selectedYear % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // let firstDate = dates.indexOf(1);
  // let lastDate = dates.indexOf(last[selectedMonth - 1], 7);

  function getMatchingPosts(date, index) {
    let isPrev = index < firstDate;
    let isNext = index > lastDate;
    const matchingPosts = posts.filter((item) => {
      const [itemYear, itemMonth, itemDate] = item.date.split("-");
      if (!isPrev && !isNext) {
        return Number(itemYear) == selectedYear && Number(itemMonth) == selectedMonth && Number(itemDate) == date;
      } else if (isPrev && selectedMonth == 1) {
        return Number(itemYear) == selectedYear - 1 && Number(itemMonth) == 12 && Number(itemDate) == date;
      } else if (isNext && selectedMonth == 12) {
        return Number(itemYear) == selectedYear + 1 && Number(itemMonth) == 1 && Number(itemDate) == date;
      } else if (isPrev) {
        return Number(itemYear) == selectedYear && Number(itemMonth) == selectedMonth - 1 && Number(itemDate) == date;
      } else if (isNext) {
        return Number(itemYear) == selectedYear && Number(itemMonth) == selectedMonth + 1 && Number(itemDate) == date;
      }
    });

    const matchingPostsWithIndex = matchingPosts.map((matchingPost) => {
      return { post: matchingPost, index };
    });

    return matchingPostsWithIndex || [];
  }

  function getHighlightedRange(postWithIndex, matchingPosts) {
    const id = postWithIndex.post.id;
    const type = postWithIndex.post.type;
    const index = postWithIndex.index;

    if (type === "start") {
      const endPostWithIndex = matchingPosts.filter((p) => p.post.id === id && p.post.type === "end");
      const endIndex = endPostWithIndex?.index;
      return { id, startIndex: index, endIndex };
    } else if (type === "end") {
      const startPostWithIndex = matchingPosts.filter((p) => p.post.id === id && p.post.type === "start");
      const startIndex = startPostWithIndex?.index;
      return { id, startIndex, endIndex: index };
    } else {
      return { id, startIndex: index, endIndex: index };
    }
  }

  return (
    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 items-center justify-center">
        {dates.prev.map((date, index) => {
          const matchingPosts = getMatchingPosts(date, index);
          // const highlightedRanges = matchingPosts.map((post) => {
          //   return getHighlightedRange(post, matchingPosts);

          // })
          return (
            <Date
              key={index}
              date={date}
              today={today}
              index={index}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              // firstDate={firstDate}
              // lastDate={lastDate}
              posts={posts}
              setPosts={setPosts}
              isPrev={index < firstDate}
              isNext={index > lastDate}
              matchingPosts={matchingPosts}
              // highlightedRanges={highlightedRanges}
            />
          );
        })}
      </div>
    </div>
  );
}
