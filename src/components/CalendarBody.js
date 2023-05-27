'use client'

import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, dates }) {

  let last = [31, selectedYear % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let firstDate = dates.indexOf(1);
  let lastDate = dates.indexOf(last[selectedMonth - 1], 7);

  return (

    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 gap-0.5 items-center justify-center">
        {dates.map((date, index) => {
          return (
            <Date
              key={index}
              date={date}
              today={today}
              index={index}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              firstDate={firstDate}
              lastDate={lastDate}

            />
          )
        })}
      </div>
    </div>
  );
}