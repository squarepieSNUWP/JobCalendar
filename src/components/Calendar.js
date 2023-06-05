import { useEffect, useState } from "react";
import CalendarBody from "./CalendarBody"
import CalendarHeader from "./CalendarHeader"
import Image from "next/image";
import NextIcon from "public/nextSWP.png";
import ModalPaper from "./ModalPaper";
import ModalInterview from "./ModalInterview"
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function Calendar() {
  // 전체 달력의 크기 및 위치를 결정하는 css
  // 현재는 너비는 max만 설정하고 높이는 직접 설정함
  // 배경색은 zinc로 함
  const calendar_container = 
    `w-full h-full p-3 pt-0 bg-white `
  


  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "Feburary", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ]

  const today = {
    y: new Date().getFullYear(),
    m: new Date().getMonth() + 1,
    d: new Date().getDate()
  }

  const [selectedYear, setSelectedYear] = useState(today.y);
  const [selectedMonth, setSelectedMonth] = useState(today.m);
  const [modalPaper, setModalPaper] = useState(false);
  const [modalInterview, setModalInterview] = useState(false);
  const [posts, setPosts] = useState([]);

  // 연도와 달을 입력 받아 해당하는 날짜들 정보를 객체로 반환하는 함수
  // ex. {y: 2023, m: 6, d: 3, currentMonth: true, diff: 0}
  function getDates(year, month) {
    // 입력받은 연도 달에서 이전 달에 해당하는 연, 월, 마지막 날짜, 마지막 요일을 계산
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevLastDay = new Date(year, month - 1, 0).getDay();
    const prevLastDate = new Date(year, month - 1, 0).getDate();

    // 입력받은 연도 달에서 이번 달에 해당하는 마지막 날짜, 마지막 요일을 계산
    const thisLastDay = new Date(year, month, 0).getDay();
    const thisLastDate = new Date(year, month, 0).getDate();

    // 입력받은 연도 달에서 다음 달에 해당하는 연, 월, 마지막 날짜, 마지막 요일을 계산
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;


    // 지난달 마지막 요일이 토요일이 아니라면 마지막 주의 날짜들을 삽입
    // 이번달 첫째 주 날짜들과 같은 줄에 보여주기 위한 작업
    // 이때 오늘 날짜와의 일수 차이를 계산 ex. 오늘 전이라면 음수, 다음이라면 양수
    const prevDates = [];
    if (prevLastDay !== 6) {
      for (let i = 0; i <= prevLastDay; i++) {
        const [y, m, d] = [prevYear, prevMonth - 1, prevLastDate - i];
        const diff = Math.ceil((new Date(y, m, d) - new Date()) / (1000 * 60 * 60 * 24));

        prevDates.unshift({
          y: prevYear,
          m: prevMonth,
          d: prevLastDate - i,
          diff,
          currentMonth: false,
        });
      }
    }

    // 이번달 날짜들을 1부터 마지막 날짜까지 삽입
    const thisDates = [];
    for (let i = 1; i <= thisLastDate; i++) {
      const [y, m, d] = [year, month - 1, i];
      const diff = Math.ceil((new Date(y, m, d) - new Date()) / (1000 * 60 * 60 * 24));
      thisDates.push({
        y: year,
        m: month,
        d: i,
        diff,
        currentMonth: true,
      });
    }

    // 다음달의 날짜를 추가하여 총 6주가 되도록 함
    const nextDates = [];
    const remainingDays = 42 - (prevDates.length + thisDates.length);

    for (let i = 1; i <= remainingDays; i++) {
      const [y, m, d] = [nextYear, nextMonth - 1, i];
      const diff = Math.ceil((new Date(y, m, d) - new Date()) / (1000 * 60 * 60 * 24));
      nextDates.push({
        y: nextYear,
        m: nextMonth,
        d: i,
        diff,
        currentMonth: false,
      });
    }

    const dates = prevDates.concat(thisDates, nextDates);

    return dates;
  }

  useEffect(() => {
    async function getPosts() {
      const newPosts = [];
      const paperCollection = collection(db, "paper_collection")
      const qP = query(paperCollection);
      const resultsP = await getDocs(qP);
      resultsP.docs.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() });
      });

      const interviewCollection = collection(db, "interview_collection")
      const qI = query(interviewCollection)
      const resultsI = await getDocs(qI)
      resultsI.docs.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts(newPosts)
    }

    getPosts()

  }, [posts])

  
  
  
    
  return (
    <div className={calendar_container}>
      {/* 일정 추가 버튼 */}
      <div className="flex justify-between">
        {/* 선택된 연도 및 월 표시 + 이전달 오늘 다음달 버튼 기능 담당하는 컴포넌트 */}
        <CalendarHeader months={months} today={today} selectedYear={selectedYear} selectedMonth={selectedMonth} setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth} />

        <a class="button mt-2">
          <span className="icon font-normal">+</span>
          <span
            className="text cursor-pointer"
            onClick={() => {
              setModalPaper(true);
            }}
          >
            Add Paper
          </span>
          <span
            className="text cursor-pointer"
            onClick={() => {
              setModalInterview(true);
            }}
          >
            Add Interview
          </span>
        </a>
      </div>

      {/* 요일과 날짜를 달력 형태로 표시하는 컴포넌트 */}
      <CalendarBody weekdays={weekdays} today={today} selectedYear={selectedYear} selectedMonth={selectedMonth} dates={getDates(selectedYear, selectedMonth)} posts={posts} />

      {/* 일정 추가 모달 컴포넌트 */}
      {modalPaper && <ModalPaper setModalPaper={setModalPaper} posts={posts} setPosts={setPosts} />}

      {modalInterview && <ModalInterview setModalInterview={setModalInterview} posts={posts} setPosts={setPosts} />}
    </div>
  );
}