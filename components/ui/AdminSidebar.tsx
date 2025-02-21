import { FaUsers, FaComments, FaEye, FaLock, FaChevronDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";  
import Link from "next/link";
import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import { RiCodeSSlashLine } from "react-icons/ri";

const AdminSidebar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [isPilotPagesOpen, setIsPilotPagesOpen] = useState(true);
  const [isUserPagesOpen, setIsUserPagesOpen] = useState(true);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <MdOutlineDashboard className="h-6 w-6" /> },
    { label: "Users", href: "/admin/users", icon: <TbUsersGroup      className="h-6 w-6" /> },
    { label: "Admins", href: "/admin/adminslist", icon: <MdOutlineAdminPanelSettings  className="h-6 w-6" /> },
    { label: "Settings", href: "/admin/settings", icon: <IoSettingsOutline      className="h-6 w-6" /> },
  ];

  const pilotPages = [
    { label: "Home", href: "/pilot/home" },
    { label: "Login", href: "/pilot/login" },
    { label: "Register", href: "/pilot/register" },
    { label: "Error", href: "/pilot/error" },
    { label: "Settings", href: "/pilot/settings" },
  ];

  const userPages = [
    { label: "Profile", href: "/user/profile" },
    { label: "My Verso", href: "/user/my-verso" },
    { label: "Community", href: "/user/community" },
    { label: "Feedback", href: "/user/feedback" },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-[#17181a] text-gray-200 p-6 font-poppins">
      <h2 className="text-2xl font-bold font-poppins">Admin Panel</h2>
      <nav className="mt-4 border-t pt-4 border-neutral-300 dark:border-neutral-700">
        <ul className="flex flex-col gap-5">
          {links.map((link, idx) => (
            <li key={idx} className="cursor-pointer hover:text-gray-400">
              <Link href={link.href} className="flex items-center gap-2">
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </Link>
            </li>
          ))}
          <li className="cursor-pointer ">
            <div className="flex items-center gap-2 hover:text-gray-400" onClick={() => setIsPagesOpen(!isPagesOpen)}>
            <RiCodeSSlashLine className="h-6 w-6" />

              <span className="ml-3">My Pages</span>
              <FaChevronDown className={`transition-transform mt-1 ${isPagesOpen ? "rotate-180" : ""}`} />
            </div>
            {isPagesOpen && (
              <ul className="ml-4 mt-2">
                <li className="mt-2 cursor-pointer">
                  <div className="flex items-center hover:text-gray-400" onClick={() => setIsPilotPagesOpen(!isPilotPagesOpen)}>
                    <FaChevronDown className={`transition-transform ${isPilotPagesOpen ? "rotate-180" : ""}`} />
                    <span className="ml-2">Core Pages</span>
                  </div>
                  {isPilotPagesOpen && (
                    <ul className="ml-4 mt-2">
                      {pilotPages.map((page, idx) => (
                        <li key={idx} className="mt-2 cursor-pointer hover:text-gray-400">
                          <Link href={page.href} className="flex items-center">
                            <span className="ml-2">{page.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className="mt-2 cursor-pointer">
                  <div className="flex items-center hover:text-gray-400" onClick={() => setIsUserPagesOpen(!isUserPagesOpen)}>
                    <FaChevronDown className={`transition-transform ${isUserPagesOpen ? "rotate-180" : ""}`} />
                    <span className="ml-2">User Pages</span>
                  </div>
                  {isUserPagesOpen && (
                    <ul className="ml-4 mt-2">
                      {userPages.map((page, idx) => (
                        <li key={idx} className="mt-2 cursor-pointer hover:text-gray-400">
                          <Link href={page.href} className="flex items-center">
                            <span className="ml-2">{page.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar; 