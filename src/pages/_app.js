import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>🔥취뽀달력🔥-</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
