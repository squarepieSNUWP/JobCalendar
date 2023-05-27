import Date from "./Date";
import Day from "./Day";

export default function CalendarBody({ weekdays, today, selectedYear, selectedMonth, dates }) {
  return (
    <div className="body">
      <Day weekdays={weekdays} />

      <div className="dates">
        {dates.map((date, index) => {
          return (
            <Date
              key={index}
              date = {date}
            />
          );
        })}
      </div>
    </div>
  );
}