export default function CalendarHeader({ months, today, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) {

  // 전체 head를 감싸는 컨테이너로, justify-between을 주어
  // year_month_wrapper와 btn_wrapper가 양끝에 위치하도록 함
  const head_container = `w-full flex justify-between mb-4`;

  // 2023과 June을 감싸는 wrapper
  const year_month_wrapper = `flex`;

  // 연도와 날짜는 텍스트 색상과 텍스트 간격만 다르게 설정함
  const year = `text-4xl font-bold ml-2 text-gray-700 tracking-wider`;
  const month = `text-4xl font-bold ml-3 text-teal-400 tracking-wide`;
  
  // 버튼들을 모두 감싸는 wrapper
  const btn_wrapper = `flex justify-end items-end`;

  // 버튼에 대한 css로
  // 배경은 투명, 경계선은 gray-500, 호버했을 때 배경이 teal-400, 투명도 0.7로 설정
  const btn = `px-2 py-1 text-sm font-normal border border-gray-500 rounded bg-transparent hover:bg-teal-400 hover:opacity-70 transition duration-300 ease-in-out`;
  


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
        <span className={year}>{selectedYear}</span>
        <span className={month}>{months[selectedMonth - 1]}</span>
      </div>

      <div className={btn_wrapper}>
        {/* 이전달과 다음달 버튼은 현재 아이콘이 아닌 텍스트로 제작한 상태*/}
        <button className={btn} onClick={goPrev}>
          &lt;
        </button>
        <button className={`${btn} ml-1`} onClick={goToday}>
          Today
        </button>
        <button className={`${btn} ml-1`} onClick={goNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}