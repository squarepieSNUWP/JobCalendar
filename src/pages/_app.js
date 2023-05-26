import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>🔥취뽀달력🔥-</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
