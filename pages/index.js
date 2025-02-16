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
        <title>Jai Raj`&apos;`s Slam Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundBeamsWithCollision className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-white mb-[2rem]">
          Welcome to Jai Raj`&apos;`s Slam!
        </h1>
        <p className="text-3xl text-gray-600">
          {isLoggedIn ? "Start by navigating to my community." : "Start by navigating to the login page."}
        </p>

        <button
          className="mt-[3rem] bg-white text-black font-semibold py-2.5 px-5 rounded-3xl text-xl transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
          onClick={handleGetStarted}
        >
          Get started
        </button>
      </BackgroundBeamsWithCollision>
    </>
  );
}
