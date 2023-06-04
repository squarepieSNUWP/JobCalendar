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
      // 요일 칸을 출력하는 Day 컴포넌트와 날짜 칸을 출력하는 Date 컴포넌트를 감싸는 body 컨테이너
      // flex-col로 배치하고 경계선은 black으로 함
      // cf. 요일 css는 Day 컴포넌트에서 구현
      const body_container = `w-full p-4 flex flex-col border border-black rounded`;

      // 날짜 칸을 출력하는 Date를 감싸는 영역으로 grid로 배치
      // 7열 6행으로 구현하는데,
      // 열(너비)는 tailwind 기본 제공 인자를 써서 1fr씩 나눠 갖도록 함
      // 행(높이)는 https://tailwindcss.com/docs/grid-template-rows 참고함
      // 6개 행이 모두 최소 112px 최대는 1fr로 설정했는데,
      // 달력의 높이와 함께 조정할 필요 있음
      const dates_container = `w-full h-full grid grid-cols-7 grid-rows-[minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)_minmax(112px,_1fr)] items-center justify-center border-b border-l border-2`;

      const [indexRange, setIndexRange] = useState([]);
      const [isHovered, setIsHovered] = useState(false);
      const [diff, setDiff] = useState(0);
      const [hoveredPost, setHoveredPost] = useState(null);

      const todayIndex = dates.findIndex((date) => {
        return today.y === date.y && today.m === date.m && today.d === date.d;
      });

      function getMatchingPosts(date) {
        const matchingPosts = posts.filter((post) => {
          const [postYear, postMonth, postDate] = post.date.split("-");
          return Number(postYear) === date.y && Number(postMonth) === date.m && Number(postDate) === date.d;
        });

        return matchingPosts;
      }

      function getPostIndex(post) {
        const [postYear, postMonth, postDate] = post.date.split("-");
        const index = dates.findIndex((date) => {
          return Number(postYear) === date.y && Number(postMonth) === date.m && Number(postDate) === date.d;
        });
        return index;
      }

      function getPostRange(post) {
        const postIndex = getPostIndex(post);
        const diff = dates[postIndex].diff;

        if (todayIndex === -1 && todayIndex <= postIndex) {
          return { range: [todayIndex, postIndex], diff };
        }

        if (todayIndex === -1) {
          return { range: [], diff };
        }

        if (postIndex < todayIndex) {
          return { range: [], diff };
        }

        if (todayIndex <= postIndex) {
          return { range: [todayIndex, postIndex], diff };
        }
      }

      return (
        <div className={body_container}>
          <Day weekdays={weekdays} />

          <div className={dates_container}>
            {dates.map((date, index) => {
              const matchingPosts = getMatchingPosts(date);
              const postRange = matchingPosts.length > 0 ? getPostRange(matchingPosts[0]) : {};
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
                  todayIndex={todayIndex == -1 ? 0 : todayIndex}
                />
              );
            })}
          </div>
        </div>
      );
    }