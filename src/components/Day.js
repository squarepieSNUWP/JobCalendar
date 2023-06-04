'use client'
export default function Day({ weekdays }) {
  return (
    // 요일 칸 전체를 감싸는 영역으로 flex로 내부 요소 배치
    <div className="w-full bg-tertiary rounded-t-2xl flex">
      {weekdays.map((weekday, index) => {
        return (
          // 요일 칸에 대한 css로
          // 너비를 1 / 7로 나눠가지며, 여백을 좌우 자동으로 갖고 텍스트를 중앙에 배치
          // 텍스트는 semi-bold로 색상은 gray-700
            <div key={index} className='w-1/7 text-center mx-auto mb-1 
             pt-1 text-base text-gray-600 font-semibold place-self-center' >
              {weekday}
            </div>
        );
      })}
    </div>
  );
}