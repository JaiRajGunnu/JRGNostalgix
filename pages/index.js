"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token to boolean (true if exists, false otherwise)
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/community"); // Redirect to splash screen if logged in
    } else {
      router.push("/auth/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <>
      {/* ✅ Set Page Title & Favicon */}
      <Head>
      <title>Jai Raj&apos;s Nostalgix</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundBeamsWithCollision className="flex flex-col justify-center items-center">
        <h1 className="text-7xl tracking-wide m-[1%] md:m-[2%] lg:m-[2%] text-center lg:text-8xl
         font-bold text-white mb-[2rem] leading-[1.25]">
          Welcome, buddy.
        </h1>
        <p className="text-md md:text-3xl lg:text-3xl text-center text-gray-600 font-poppins">
          {isLoggedIn ? "Start by navigating to my community." : "Start by navigating to the login page."}
        </p>

        <button
          className="mt-[2rem] md:mt-[3rem] lg:mt-[3rem] bg-white text-black font-medium font-poppins
          py-2.5 px-5 rounded-3xl text-xl scale-[0.9] md:scale-[1] lg:scale-[1]
          transition duration-300 ease-in-out font-arial
          hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
          onClick={handleGetStarted}
        >
          Get started
        </button>
      </BackgroundBeamsWithCollision>
    </>
  );
}
