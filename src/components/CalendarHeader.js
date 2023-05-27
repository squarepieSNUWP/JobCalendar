export default function CalendarHeader({ months, today, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) {
  return (
    <div className="header">
      <div className="year-month-wrapper">
        <span className="year">{selectedYear}</span>
        <span className="month">{months[selectedMonth - 1]}</span>
      </div>

      <div className="btn-wrapper">
        <button className="nav prev">
          &lt;
        </button>
        <button className="nav today">
          Today
        </button>
        <button className="nav next">
          &gt;
        </button>
      </div>
    </div>
  );
}