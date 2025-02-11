"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt, IconUserCircle } from "@tabler/icons-react";
import { useSidebar } from "@/components/ui/sidebar";
import friends from "../../data/friends.json";
import { useEffect, useState } from "react";
import AuthGuard from "@/guard/authguard"; 

const UserAvatar = ({ username }) => {
  const { open } = useSidebar();

  return (
    <AuthGuard>

    <div className="flex items-center gap-5 py-3 border-t pt-15 border-neutral-300 dark:border-neutral-700">
      <motion.div animate={{ scale: open ? 1 : 0.9 }} transition={{ duration: 0.2 }}>
        <IconUserCircle className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
      </motion.div>

      <motion.span
        animate={{
          opacity: open ? 1 : 0,
          width: open ? "auto" : 0,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-lg font-medium overflow-hidden whitespace-nowrap"
      >
        {username}
      </motion.span>
    </div>
    </AuthGuard>
  );
};

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

  // ✅ Logout Functionality
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Profile", href: "#", icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Head>
        <title>{friend.name} - Jai Raj's Slam Book</title>
      </Head>

      <div className="flex h-screen flex-wrap">
        {/* ✅ Sidebar */}
        <Sidebar>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) =>
                  link.label === "Logout" ? (
                    <button key={idx} onClick={link.onClick} className="w-full text-left">
                      <SidebarLink link={link} />
                    </button>
                  ) : (
                    <SidebarLink key={idx} link={link} />
                  )
                )}
              </div>
            </div>

            <UserAvatar username={username} />
          </SidebarBody>
        </Sidebar>

        {/* ✅ Background and Friend Details */}
        <div className="flex-1 flex flex-col justify-center items-center min-h-screen text-white bg-black">
          <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center w-full">
            <h1 className="text-6xl font-bold text-white mb-[2rem]">{friend.name}</h1>
            <p className="text-2xl text-gray-400 italic">"{friend.quote}"</p>
          </BackgroundBeamsWithCollision>
        </div>
      </div>

    </>
  );
};

export default FriendsPage;
