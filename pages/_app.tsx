// pages/_app.tsx

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionExpired, setSessionExpired] = useState(false);
  const router = useRouter();

  // Helper to handle logout & show expiration
  const logoutAndExpire = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpireAt");
    setSessionExpired(true);

    // Optionally redirect to login if user isn't already there
    if (router.pathname !== "/auth/login") {
      router.replace("/auth/login");
    }

    // Hide message after 3 seconds
    setTimeout(() => setSessionExpired(false), 3000);
  }, [router]);

  useEffect(() => {
    // 1) On mount, check if there's an existing token & if it's expired
    const token = localStorage.getItem("token");
    const expireAt = localStorage.getItem("sessionExpireAt");

    if (token && expireAt) {
      const expireTime = parseInt(expireAt, 10);
      if (Date.now() >= expireTime) {
        // Session is already expired
        logoutAndExpire();
      }
    }

    // 2) Set an interval to check every X seconds if session expired
    const intervalId = setInterval(() => {
      const tokenCheck = localStorage.getItem("token");
      const expireAtCheck = localStorage.getItem("sessionExpireAt");
      if (tokenCheck && expireAtCheck) {
        const expireTimeCheck = parseInt(expireAtCheck, 10);
        if (Date.now() >= expireTimeCheck) {
          // Session expired
          logoutAndExpire();
        }
      }
    }, 10_000); // check every 10s or 30s, your preference

    return () => clearInterval(intervalId);
  }, [logoutAndExpire, router.pathname]);

  return (
    <>
      {/* 1) Global Head meta tags */}
      <Head>
        <meta
          name="description"
          content="Welcome to Jai Raj's Slam Book – a space for my friends to share their memories, favorites, and more!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Jai Raj, Jai raj slam, Slam Book, friendship," />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jai Raj Gunnu" />
        
        {/* Open Graph (OG) Meta Tags for Social Sharing */}
        <meta property="og:title" content="Jai Raj&apos;s Slam Book" />
        <meta property="og:description" content="A space for my friends to share their memories, favorites, and more!" />
        <meta property="og:image" content="https://jairajslam25.vercel.app/favicon.ico" />
        <meta property="og:url" content="https://jairajslam25.vercel.app" />
        <meta property="og:type" content="website" />

        <title>Jai Raj&apos;s Slam Book</title>
      </Head>

      {/* 2) Render your actual page */}
      <Component {...pageProps} />

      {/* 3) Floating expiration message */}
      {sessionExpired && (
        <div className="fixed bottom-5 right-5 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
          Session time expired.
        </div>
      )}
    </>
  );
}

export default MyApp;
