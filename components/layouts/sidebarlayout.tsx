"use client";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconSettings,  IconHome, IconMessage2Code, IconLogout2, IconUserHeart,  IconHeart, } from "@tabler/icons-react";
import { useSidebar } from "@/components/ui/sidebar";
import AuthGuard from "@/guard/authguard";
import { fakeTestimonials } from "@/components/ui/friends";

const UserAvatar = ({ username }: { username: string }) => {
  const { open } = useSidebar();
  const [profileImage, setProfileImage] = useState<string>(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PyKYrBKAWWy6YCbQzWQcwIRqH8wYMPluIZiMpV1w0NYSbocTZz0ICWFkLcXhaMyvCwQ&usqp=CAU' // Default image
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const matchedFriend = fakeTestimonials.find(friend => friend.email === data.user.email);
          if (matchedFriend) {
            setProfileImage(matchedFriend.src);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center gap-5 py-3 border-t pt-25 border-neutral-300 dark:border-neutral-700">
      <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
        <img
          src={profileImage}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>
      <span
        className={`text-neutral-700 dark:text-neutral-200 text-lg font-medium overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 w-0"
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
    { label: "Home", href: "/community", icon: <IconHome className="h-8 w-8" /> },
    { label: "My page", href: "/aboutme", icon: <IconHeart className="h-8 w-8" /> },
    { label: "Profile", href: "/profile", icon: <IconUserHeart className="h-8 w-8" /> },
    { label: "Feedback", href: "/feedback", icon: <IconMessage2Code className="h-8 w-8" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="h-8 w-8" /> },
    { label: "Logout", href: "", icon: <IconLogout2 className="h-8 w-8" />, onClick: handleLogout  },
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