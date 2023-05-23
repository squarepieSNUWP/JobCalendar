import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center text-primary">Calender</h1>
      <Link href="/jobs" className="text-2xl font-bold text-center text-secondary">
        채용 공고 목록 보러가기
      </Link>
      <Link href="/detail" className="text-2xl font-bold text-center text-secondary">
        공고 세부사항 
      </Link>
    </main>
  )
}
