import Head from "next/head";
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JAISLAM25</title>
        <meta name="description" content="Your description here" />
        <link rel="icon" href="../favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
