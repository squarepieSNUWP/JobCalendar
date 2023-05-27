'use client'
export default function Day({ weekdays }) {
  return (
    <div className="w-full flex">
      {weekdays.map((weekday, index) => {
        return (
          <div key={index} className="w-1/7 text-center mx-auto my-2 text-base text-gray-700 font-semibold">
            {weekday}
          </div>
        );
      })}
    </div>
  );
}