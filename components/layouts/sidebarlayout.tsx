"use client";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt, IconUserCircle } from "@tabler/icons-react";
import { useSidebar } from "@/components/ui/sidebar";
import AuthGuard from "@/guard/authguard";

const UserAvatar = ({ username }: { username: string }) => {
  const { open } = useSidebar();

  return (
    <div className="flex items-center gap-5 py-3 border-t pt-15 border-neutral-300 dark:border-neutral-700">
      <IconUserCircle className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
      <span
        className={`text-neutral-700 dark:text-neutral-200 text-lg font-medium overflow-hidden whitespace-nowrap transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {username}
      </span>
    </div>
  );
};

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="h-5 w-5" /> },
    { label: "Profile", href: "#", icon: <IconUserBolt className="h-5 w-5" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="h-5 w-5" />, onClick: handleLogout },
  ];

  return (
    <AuthGuard>
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

        <div className="flex-1">{children}</div>
      </div>
    </AuthGuard>
  );
};

export default SidebarLayout;
