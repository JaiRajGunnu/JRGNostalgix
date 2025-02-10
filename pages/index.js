"use client";
import Head from "next/head"; // ✅ Import Head for setting title & favicon
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const router = useRouter(); 

  return (
    <>
      {/* ✅ Set Page Title & Favicon */}
      <Head>
        <title>Jai Raj's Slam Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundBeamsWithCollision className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-white mb-[2rem]">
          Welcome to Jai Raj's Slam!
        </h1>
        <p className="text-3xl text-gray-600">Start by navigating to the login page.</p>

        <button
          className="mt-[3rem] bg-white text-black font-semibold py-2 px-4 rounded-3xl text-xl transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
          onClick={() => router.push("/auth/login")}
        >
          Get started
        </button>
      </BackgroundBeamsWithCollision>
    </>
  );
}
