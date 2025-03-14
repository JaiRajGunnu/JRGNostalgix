"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { Friends } from "@/components/ui/friends";
import { shortTestimonials } from "@/components/ui/friends";
import Animatebg from '../components/ui/Animatebg'; // Import the new component
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";

export default function Community() {
  const [username, setUsername] = useState("Guest");
  const [showFriends, setShowFriends] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsAdmin(userData.role === "admin");
    }
  }, []);

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
        <title>Jai Raj&apos;s Nostalgix</title>
      </Head>

      <SidebarLayout>
        <div className="min-h-screen text-white bg-black relative"> {/* Added relative here */}
          <Animatebg />

          {showFriends ? (
            <Friends testimonials={shortTestimonials} />
          ) : (
            <div className="relative z-10 pt-[15rem] mt-[0] md:pt-[16rem] lg:pt-[16rem]
             flex flex-col justify-center items-center font-hammersmith w-full shadow-xl">
              <h1 className="text-6xl md:text-6xl lg:text-7xl text-center leading-[1.3]
            font-bold text-white mb-[1.5rem] md:mb-[2rem] lg:mb-[2.5rem] w-[90%] md:w-full lg:w-full">
                Jai Raj&apos;s Nostalgix</h1>
              <h2 className="text-2xl md:text-3xl lg:text-3xl text-gray-600 font-poppins font-medium ">
                Welcome, {username}!</h2>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger >

                    {isAdmin && (
                      <p className="py-5 text-md font-poppins font-medium text-center  mt-[0.5rem] -mb-[1rem] text-gray-600 cursor-help">
                        Congrats! You&apos;re an Admin, now 🎉.
                      </p>
                    )}

                  </TooltipTrigger>
                  <TooltipContent side="right">Navigate to the sidebar to access the Admin Panel.</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <button
                onClick={() => setShowFriends(true)}
                className="scale-[90%] md:scale-[100%] lg:scale-[100%]  my-[2rem]
                bg-white text-black font-semibold py-2.5 px-5 rounded-3xl text-xl 
                transition duration-300 ease-in-out tracking-wider font-poppins
                hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              >  Explore now  </button>
            </div>
          )}
        </div>
      </SidebarLayout>
    </>
  );
}