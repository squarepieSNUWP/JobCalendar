export default function Date({date}) {
  return (
    <div className="h-20 border border-gray-700 text-gray-700 font-semibold text-sm transition duration-700 ease-in-out cursor-pointer flex flex-col relative hover:bg-gray-300">
      <div className="flex justify-end relative p-2 z-2">{date}</div>
    </div>
  );
}