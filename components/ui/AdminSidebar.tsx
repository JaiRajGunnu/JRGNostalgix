import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbUsersGroup, TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand, TbDatabaseCog } from "react-icons/tb";
import { RiCodeSSlashLine } from "react-icons/ri";
import { IconLogout2 } from "@tabler/icons-react";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void; // Define the type for the setter function
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [isPilotPagesOpen, setIsPilotPagesOpen] = useState(true);
  const [isUserPagesOpen, setIsUserPagesOpen] = useState(true);


  const links = [
    { label: "Dashboard", href: "/admin", icon: <MdOutlineDashboard className="h-6 w-6" /> },
    { label: "Members", href: "/admin/users", icon: <TbUsersGroup className="h-6 w-6" /> },
    { label: "Admins", href: "/admin/adminslist", icon: <MdOutlineAdminPanelSettings className="h-6 w-6" /> },
    { label: "Database", href: process.env.NEXT_PUBLIC_MONGODB_CLUSTER_URL || '#',  icon: <TbDatabaseCog className="h-6 w-6" />  },
  ];

  const pilotPages = [
    { label: "Login", href: "/auth/login" },
    { label: "Register", href: "/auth/register" },
    { label: "Error", href: "/error" },
    { label: "Settings", href: "/settings" },
  ];

  const userPages = [
    { label: "Profile", href: "/profile" },
    { label: "My Verso", href: "/aboutme" },
    { label: "Community", href: "/community" },
    { label: "Friend's Page", href: "/community/11092202" },
    { label: "Feedback", href: "/feedback" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/auth/login"; // Redirect to login page
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full text-gray-200 p-6 font-poppins transition-all duration-300 
        ${isSidebarOpen ? "w-64 bg-[#17181a]" : "w-12 bg-transparent"}`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center">
        {isSidebarOpen && <h2 className="text-2xl font-bold font-poppins mt-4">Admin Panel</h2>}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isSidebarOpen ? (
            <TbLayoutSidebarLeftCollapse className="h-7 w-7 mt-4" />
          ) : (
            <TbLayoutSidebarLeftExpand className="h-7 w-7 mt-4" />
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <nav
        className={`mt-4 border-t pt-4 border-neutral-300 dark:border-neutral-700 
        ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col gap-5 capitalize mt-2 ">
          {links.map((link, idx) => (
            <li key={idx} className="cursor-pointer hover:text-gray-400">
              {link.label === "Database" ? (
                <a 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {link.icon}
                  <span className="ml-3">{isSidebarOpen && link.label}</span>
                </a>
              ) : (
                <Link href={link.href} className="flex items-center gap-2">
                  {link.icon}
                  <span className="ml-3">{isSidebarOpen && link.label}</span>
                </Link>
              )}
            </li>
          ))}

          {/* Logout Button */}
          <li className="cursor-pointer hover:text-gray-400" onClick={handleLogout}>
            <div className="flex items-center gap-2">
              <IconLogout2 className="h-6 w-6" />
              <span className="ml-3">{isSidebarOpen && "Logout"}</span>
            </div>
          </li>

          {/* My Pages Section */}
          <div className="flex items-center gap-2 hover:text-gray-400" onClick={() => setIsPagesOpen(!isPagesOpen)}>
            <RiCodeSSlashLine className="h-6 w-6 " />
            <span className="ml-3">{isSidebarOpen && "My Pages"}</span>
            <FaChevronDown className={`transition-transform mt-0 opacity-80 cursor-pointer ${isPagesOpen ? "rotate-180" : ""}`} />
          </div>
          {isPagesOpen && (
            <ul className="ml-4 -mt-5">
              {/* Core Pages */}
              <li className="mt-5 cursor-pointer">
                <div className="flex items-center hover:text-gray-400" onClick={() => setIsPilotPagesOpen(!isPilotPagesOpen)}>
                  <FaChevronDown className={`transition-transform ${isPilotPagesOpen ? "rotate-180" : ""}`} />
                  <span className="ml-2">{isSidebarOpen && "Core Pages"}</span>
                </div>
                {isPilotPagesOpen && (
                  <ul className="ml-4 mt-2">
                    {pilotPages.map((page, idx) => (
                      <li key={idx} className="mt-2 cursor-pointer hover:text-gray-400">
                        <Link href={page.href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <span className="ml-2">{page.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* User Pages */}
              <li className="mt-5 cursor-pointer">
                <div className="flex items-center hover:text-gray-400" onClick={() => setIsUserPagesOpen(!isUserPagesOpen)}>
                  <FaChevronDown className={`transition-transform ${isUserPagesOpen ? "rotate-180" : ""}`} />
                  <span className="ml-2">{isSidebarOpen && "User Pages"}</span>
                </div>
                {isUserPagesOpen && (
                  <ul className="ml-4 mt-2">
                    {userPages.map((page, idx) => (
                      <li key={idx} className="mt-2 cursor-pointer hover:text-gray-400">
                        <Link href={page.href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <span className="ml-2">{page.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
