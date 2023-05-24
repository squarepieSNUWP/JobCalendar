import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-6xl font-bold text-center text-primary mb-12">Calender</h1>
      <div className=" h-48 flex flex-col justify-center">
        <Link href="/jobs" className="text-2xl font-bold text-center text-secondary mb-6">
          채용 공고 목록 보러가기
        </Link>
        <Link href="/detail" className="text-2xl font-bold text-center text-secondary">
          공고 세부사항 
        </Link>
      </div>
    </Layout>
  )
}
