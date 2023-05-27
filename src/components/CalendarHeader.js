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
    setSelectedYear(today.year);
    setSelectedMonth(today.month);
  }


  return (
    <div className="w-full flex justify-between mb-4">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold ml-3 tracking-widest">{selectedYear}</span>
        <span className="text-3xl font-bold ml-3 tracking-widest text-blue-400">{months[selectedMonth - 1]}</span>
      </div>

      <div className="flex justify-end items-end">
        <button
          className="px-2 py-1 text-sm font-normal border border-gray-300 rounded bg-transparent hover:bg-blue-500 hover:opacity-70 transition duration-1000 ease-in-out" onClick={goPrev}>&lt;</button>
        <button
          className="px-2 py-1 text-sm font-normal border border-gray-300 rounded bg-transparent hover:bg-blue-500 hover:opacity-70 transition duration-1000 ease-in-out" onClick={goToday}>Today</button>
        <button
          className="px-2 py-1 text-sm font-normal border border-gray-300 rounded bg-transparent hover:bg-blue-500 hover:opacity-70 transition duration-1000 ease-in-out" onClick={goNext}>&gt;</button>
      </div>
    </div>
  );
}