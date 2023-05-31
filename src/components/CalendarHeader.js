'use client'
export default function CalendarHeader({ months, today, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) {

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
    <div className="w-full flex justify-between mb-4">
      <div className="flex items-baseline">
        <span className="text-4xl text-gray-700 font-bold ml-2 tracking-wider">{selectedYear}</span>
        <span className="text-4xl font-bold ml-3 text-teal-400 tracking-wide">{months[selectedMonth - 1]}</span>
      </div>

      <div className="flex justify-end items-end">
        <button
          className="px-2 py-1 text-sm font-normal border border-gray-500 rounded bg-transparent hover:bg-teal-400 hover:opacity-70 transition duration-1000 ease-in-out" onClick={goPrev}>&lt;</button>
        <button
          className="ml-1 px-2 py-1 text-sm font-normal border border-gray-500 rounded bg-transparent hover:bg-teal-400 hover:opacity-70 transition duration-1000 ease-in-out" onClick={goToday}>Today</button>
        <button
          className="ml-1 px-2 py-1 text-sm font-normal border border-gray-500 rounded bg-transparent hover:bg-teal-400  hover:opacity-70 transition duration-1000 ease-in-out" onClick={goNext}>&gt;</button>
      </div>
    </div>
  );
}