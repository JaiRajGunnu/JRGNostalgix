"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { Friends } from "@/components/ui/friends";
import { shortTestimonials } from "@/components/ui/friends";

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
        <title>Jai Raj's Slam Book</title>
      </Head>

      <SidebarLayout>
        <div className="flex flex-col justify-center items-center min-h-screen text-white bg-black">
          {showFriends ? (
            <Friends testimonials={shortTestimonials} />
          ) : (
            <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center w-full">
              <h1 className="text-4xl md:text-6xl lg:text-6xl text-center font-bold text-white mb-[2rem]">Jai Raj's Slam Book</h1>
              <h2 className="text-2xl md:text-3xl lg:text-3xl text-gray-600">Welcome, {username}!</h2>
              <button
                onClick={() => setShowFriends(true)}
                className="scale-[90%] md:sacale-[100%] lg:scale-[100%] mt-[3rem] bg-white text-black font-semibold py-2.5 px-5 rounded-3xl text-xl transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              >
                Explore now
              </button>
            </BackgroundBeamsWithCollision>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}
