"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { Friends } from "@/components/ui/friends";
import { shortTestimonials } from "@/components/ui/friends";
import Animatebg from '../components/ui/Animatebg'; // Import the new component

export default function Community() {
  const [username, setUsername] = useState("Guest");
  const [showFriends, setShowFriends] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");

    if (!token) {
      router.push("/");
    } else if (storedName) {
      setUsername(storedName);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Jai Raj&apos;s Slam Book</title>
      </Head>

      <SidebarLayout>
        <div className="min-h-screen text-white bg-black relative"> {/* Added relative here */}
          <Animatebg />

          {showFriends ? (
            <Friends testimonials={shortTestimonials} />
          ) : (
            <div className="relative z-10 pt-[16rem] md:pt-[16rem] lg:pt-[16rem]
             flex flex-col justify-center items-center font-hammersmith w-full shadow-xl">                
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-center
            font-bold text-white mb-[1.5rem] md:mb-[2rem] lg:mb-[2.5rem]">
              Jai Raj&apos;s Slam Book</h1>
              <h2 className="text-2xl md:text-3xl lg:text-3xl text-gray-600">
                Welcome, {username}!</h2>
              <button
                onClick={() => setShowFriends(true)}
                className="scale-[90%] md:sacale-[100%] lg:scale-[100%] mt-[2rem] md:mt-[2rem] lg:mt-[3rem]
                bg-white text-black font-semibold py-2.5 px-5 rounded-3xl text-xl 
                transition duration-300 ease-in-out 
                hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              >
                Explore now
              </button>
            </div>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}