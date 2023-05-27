import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, dates }) {
  return (
    <div className="w-full p-4 text-base flex flex-col border border-black rounded">
      <Day weekdays={weekdays} />

      <div className="w-full h-full grid grid-cols-7 gap-0.5 items-center justify-center">
        {dates.map((date, index) => {
          return <Date key={index} date={date} />;
        })}
      </div>
    </div>
  );
}