"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import friends from "../../data/friends.json";
import { useEffect, useState } from "react";

const FriendsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const friend = friends.find((f) => f.id.toString() === id);

  if (!friend) {
    return <h1 className="text-center text-white text-3xl mt-20">404 - Friend Not Found</h1>;
  }

  return (
    <>
      <Head>
        <title>{friend.name} - Jai Raj's Slam Book</title>
      </Head>

      <SidebarLayout>
        <div className="flex flex-col justify-center items-center min-h-screen text-white bg-black">
          <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center w-full">
            <h1 className="text-6xl font-bold text-white mb-[2rem]">{friend.name}</h1>
            <p className="text-2xl text-gray-400 italic">"{friend.quote}"</p>
          </BackgroundBeamsWithCollision>
        </div>
      </SidebarLayout>
    </>
  );
};

export default FriendsPage;
