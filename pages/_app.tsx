// pages/_app.tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css"; // Or your global styles

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionExpired, setSessionExpired] = useState(false);
  const router = useRouter();

  // Helper to handle logout & show expiration
  const logoutAndExpire = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpireAt");
    setSessionExpired(true);

    // Optionally redirect to login if user isn't already there
    if (router.pathname !== "/auth/login") {
      router.replace("/auth/login");
    }

    // Hide message after 3 seconds
    setTimeout(() => setSessionExpired(false), 3000);
  };

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

    // 2) Set an interval to check every 30 seconds if session expired
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
    }, 10_000); // every 30s

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Render the actual page */}
      <Component {...pageProps} />

      {/* Floating expiration message */}
      {sessionExpired && (
        <div className="fixed bottom-5 right-5 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
          Session time expired.
        </div>
      )}
    </>
  );
}

export default MyApp;
