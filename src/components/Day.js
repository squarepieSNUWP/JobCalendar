export default function Day({weekdays}) {
  return (
    <div className="days">
      {weekdays.map((weekday, index) => {
        return (
          <div
            key={index}
            className="day">
            {weekday}
          </div>
        );
      })}
    </div>
  );
}