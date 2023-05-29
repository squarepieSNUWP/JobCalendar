'use client'

import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, dates, posts, setPosts }) {


  function getMatchingPosts(year, month, date) {
    const matchingPosts = posts.filter((post) => {

      let calendatDate = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
      return post.date == calendatDate
    });
    return matchingPosts
  }

  return (
    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 items-center justify-center">
        {dates.prev.map((date, index) => {
          const year =
            selectedMonth === 1 ? selectedYear - 1 : selectedYear;
          const month =
            selectedMonth === 1 ? 12 : selectedMonth - 1;
          const matchingPosts = getMatchingPosts(year, month, date);
          return (
            <Date
              key={index}
              type={'prev'}
              date={date}
              index={index}
              today={today}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              posts={posts}
              setPosts={setPosts}
              matchingPosts={matchingPosts}
            />
          );
        })}

        {dates.this.map((date, index) => {
          const year = selectedYear
          const month = selectedMonth
          const matchingPosts = getMatchingPosts(year, month, date);
          return (
            <Date
              key={index}
              type={'this'}
              date={date}
              index={index}
              today={today}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              posts={posts}
              setPosts={setPosts}
              matchingPosts={matchingPosts}
            />
          );
        })}

        {dates.next.map((date, index) => {
          const year =
            selectedMonth === 12 ? selectedYear + 1 : selectedYear;
          const month =
            selectedMonth === 12 ? 1 : selectedMonth + 1;
          const matchingPosts = getMatchingPosts(year, month, date);
          return (
            <Date
              key={index}
              type={'next'}
              date={date}
              index={index}
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