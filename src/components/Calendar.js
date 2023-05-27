'use client'
import { useState } from "react";
import CalendarBody from "./CalendarBody"
import CalendarHeader from "./CalendarHeader"
import Modal from "./Modal";

export default function Calendar() {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate()
    }

    let [selectedYear, setSelectedYear] = useState(today.year);
    let [selectedMonth, setSelectedMonth] = useState(today.month);
    let [modal, setModal] = useState(false);
    let [posts, setPosts] = useState([]);

    function getDates(year, month) {
      // 입력받은 연도 달에서 이전 달의 요일과 날짜를 저장
      let prevLastDay = new Date(year, month - 1, 0).getDay();
      let prevLastDate = new Date(year, month - 1, 0).getDate();

      // 입력받은 연도 달의 요일과 날짜를 저장
      let thisLastDay = new Date(year, month, 0).getDay();
      let thisLastDate = new Date(year, month, 0).getDate();

      // 지난달 마지막 요일이 토요일이 아니라면 마지막 주의 날짜들을 삽입
      // 이번달 첫째 주 날짜들과 같은 줄에 보여주기 위한 작업
      let prevDates = [];
      if (prevLastDay !== 6) {
        for (let i = 0; i <= prevLastDay; i++) {
          prevDates.unshift(prevLastDate - i);
        }
      }

      // 이번달 날짜들을 1부터 마지막 날짜까지 삽입
      let thisDates = [];
      for (let i = 1; i <= thisLastDate; i++) {
        thisDates.push(i);
      }

      // 다음달의 날짜를 추가하여 총 6주가 되도록 함
      let nextDates = [];
      let remainingDays = 42 - (prevDates.length + thisDates.length); // 남은 일수 계산

      for (let i = 1; i <= remainingDays; i++) {
        nextDates.push(i);
      }

      let Dates = prevDates.concat(thisDates, nextDates);
      return Dates
    }

    

    return (
      <div className="max-w-4xl h-600 bg-gray-200 p-6 rounded-lg shadow-md mx-auto">
        <CalendarHeader months={months} today={today} selectedYear={selectedYear} selectedMonth={selectedMonth} setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth} />

        <CalendarBody weekdays={weekdays} today={today} selectedYear={selectedYear} selectedMonth={selectedMonth} dates={getDates(selectedYear, selectedMonth)} posts={posts} setPosts={setPosts} />

        <div className="flex h-10 justify-end items-center">
          <button
            className="py-2 px-4 text-sm font-semibold rounded-lg bg-teal-400 text-white cursor-pointer mt-4"
            onClick={() => {
              setModal(true);
            }}
          >
            Add Job Posting
          </button>
        </div>
        
        {
          modal && <Modal setModal={setModal} posts={posts} setPosts={setPosts} />
        }
      </div>
    );
}