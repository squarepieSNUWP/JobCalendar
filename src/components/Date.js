'use client'
import { useState, useEffect } from "react";

export default function Date({ date, today, index, selectedYear, selectedMonth, firstDate, lastDate }) {

  let [differentMonth, setDifferentMonth] = useState(false);
  let [isToday, setIsToday] = useState(false);

  let isPrev = index < firstDate;
  let isNext = index > lastDate;

  useEffect(() => {
    if (isPrev || isNext) {
      setDifferentMonth(true);
    }

    if (selectedYear == today.year && selectedMonth == today.month && date == today.date) {
      setIsToday(true);
    }

      
    return () => {
      setDifferentMonth("");
      setIsToday("");
    }
    }, [selectedMonth, selectedYear]);



  return (
    <div className="h-20 border border-gray-700 text-gray-700 font-semibold text-sm transition duration-700 ease-in-out cursor-pointer flex flex-col relative hover:bg-gray-300">
      {isToday && <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-teal-400 z-1"></div>}
      <div
        className="flex justify-end relative p-2 z-2"
        style={{
          color: isToday ? "white" : differentMonth ? "grey" : null,
          fontWeight: isToday ? 600 : null,
        }}
      >
        {date}
      </div>
    </div>
  );
}