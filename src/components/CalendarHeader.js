'use client'
export default function CalendarHeader({ months, today, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) {

  const head_container = `w-full flex justify-between mb-4`;
  const year_month_wrapper = `flex items-baseline`;
  const year = `text-4xl font-bold ml-2 text-gray-700 tracking-wider`;
  const month = `text-4xl font-bold ml-3 text-teal-400 tracking-wide`;
  const btn_wrapper = `flex justify-end items-end`;
  const btn = `px-2 py-1 text-sm font-normal border border-gray-500 rounded bg-transparent hover:bg-teal-400 hover:opacity-70 transition duration-1000 ease-in-out`;
  


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