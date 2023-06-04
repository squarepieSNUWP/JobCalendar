import Image from "next/image";
import NextIcon from "public/nextSWP.png";
import PrevIcon from "public/previousSWP.png";

export default function CalendarHeader({ months, today, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) {

  // 전체 head를 감싸는 컨테이너로, justify-between을 주어
  // year_month_wrapper와 btn_wrapper가 양끝에 위치하도록 함
  const head_container = `w-full flex items-center justify-cenet mb-4`;

  // 2023과 June을 감싸는 wrapper
  const year_month_wrapper = `flex`;

  // 연도와 날짜는 텍스트 색상과 텍스트 간격만 다르게 설정함
  const month = `text-4xl font-bold text-gray-600`;
  const year = `text-4xl font-bold ml-2 text-gray-600`;
  
  
  // 버튼들을 모두 감싸는 wrapper
  const btn_wrapper = `flex`;

  // 버튼에 대한 css로
  // 배경은 투명, 경계선은 gray-500, 호버했을 때 배경이 teal-400, 투명도 0.7로 설정
  const btn = `mt-2.5`;
  


  function goPrev() {
    if (selectedMonth == 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
      return;
    }
    setSelectedMonth(selectedMonth - 1);
  }

  function goNext() {
    if (selectedMonth == 12) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
      return;
    }
    setSelectedMonth(selectedMonth + 1);
  }

  function goToday() {
    setSelectedYear(today.y);
    setSelectedMonth(today.m);
  }


  return (
    <div className={head_container}>
      <div className={year_month_wrapper}>
        <span className={month}>{months[selectedMonth - 1]}</span>
        <span className={year}>{selectedYear}</span> 
      </div>

      <div className={btn_wrapper}>
        {/* 이전달과 다음달 버튼은 현재 아이콘이 아닌 텍스트로 제작한 상태*/}
        <button className={`${btn} ml-4 w-20 h-7 pb-0.1 rounded-2xl font-semibold border border-gray-400 rounded text-gray-500 
  bg-transparent hover:bg-gray-400 text-sm hover:opacity-70 transition duration-200 ease-in-out`} onClick={goToday}>
          Today
        </button>
        <button className={`${btn} bg-tertiary ml-3 w-7 h-7 rounded-full hover:bg-secondary`} onClick={goPrev}>
          <Image
              src={PrevIcon}
              alt="previous"
              className="h-4 w-4 ml-1 opacity-75"
            ></Image>
        </button>
        <button className={`${btn} bg-tertiary ml-1 w-7 h-7 rounded-full hover:bg-secondary`} onClick={goNext}>
          <Image
              src={NextIcon}
              alt="next"
              className="h-4 w-4 ml-2 opacity-75"
            ></Image>
        </button>
      </div>
    </div>
  );
}