export default function CalendarHeader({ months, today, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) {
  return (
    <div className="w-full flex justify-between mb-4">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold ml-3 tracking-widest">{selectedYear}</span>
        <span className="text-3xl font-bold ml-3 tracking-widest text-blue-400">{months[selectedMonth - 1]}</span>
      </div>

      <div className="flex justify-end items-end">
        <button className="px-2 py-1 text-sm font-normal border border-gray-300 rounded bg-transparent hover:bg-blue-500 hover:opacity-70 transition duration-1000 ease-in-out">&lt;</button>
        <button className="px-2 py-1 text-sm font-normal border border-gray-300 rounded bg-transparent hover:bg-blue-500 hover:opacity-70 transition duration-1000 ease-in-out">Today</button>
        <button className="px-2 py-1 text-sm font-normal border border-gray-300 rounded bg-transparent hover:bg-blue-500 hover:opacity-70 transition duration-1000 ease-in-out">&gt;</button>
      </div>
    </div>
  );
}