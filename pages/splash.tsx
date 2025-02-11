"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt, IconUserCircle } from "@tabler/icons-react";
import { useSidebar } from "@/components/ui/sidebar";

const UserAvatar = ({ username }: { username: string }) => {
  const { open } = useSidebar();

  return (
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
  );
};

export default function Splash() {
  const [username, setUsername] = useState("Guest");
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

  // ✅ Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("rememberMe"); // Clear remember me if checked
    router.push("/"); // Redirect to login page
  };

  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Profile", href: "#", icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
      onClick: handleLogout, // ✅ Add click event for logout
    },
  ];

  return (
    <>
      <Head>
        <title>Jai Raj's Slam Book</title>
      </Head>

      <div className="flex h-screen flex-wrap">
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

        <div className="flex-1 flex flex-col justify-center items-center min-h-screen text-white bg-black">
          <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl font-bold">Jai Raj's Slam Book</h1>
            <h2 className="text-2xl mt-4">Welcome, {username}!</h2>
          </BackgroundBeamsWithCollision>
        </div>
      </div>
    </>
  );
}
