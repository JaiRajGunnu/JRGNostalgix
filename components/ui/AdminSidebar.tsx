import { FaUsers, FaComments, FaEye, FaLock, FaChevronDown } from "react-icons/fa";  
import Link from "next/link";
import { useState } from "react";

const AdminSidebar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [isPilotPagesOpen, setIsPilotPagesOpen] = useState(true);
  const [isUserPagesOpen, setIsUserPagesOpen] = useState(true);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <FaEye className="h-6 w-6" /> },
    { label: "Users", href: "/admin/users", icon: <FaUsers className="h-6 w-6" /> },
    { label: "Admins List", href: "/admin/adminslist", icon: <FaLock className="h-6 w-6" /> },
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
    <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-gray-200 p-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <nav className="mt-6">
        <ul>
          {links.map((link, idx) => (
            <li key={idx} className="mt-4 cursor-pointer hover:text-gray-400">
              <Link href={link.href} className="flex items-center">
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            </li>
          ))}
          <li className="mt-4 cursor-pointer">
            <div className="flex items-center" onClick={() => setIsPagesOpen(!isPagesOpen)}>
              <FaChevronDown className={`transition-transform ${isPagesOpen ? "rotate-180" : ""}`} />
              <span className="ml-2">My Pages</span>
            </div>
            {isPagesOpen && (
              <ul className="ml-4 mt-2">
                <li className="mt-2 cursor-pointer">
                  <div className="flex items-center" onClick={() => setIsPilotPagesOpen(!isPilotPagesOpen)}>
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
                  <div className="flex items-center" onClick={() => setIsUserPagesOpen(!isUserPagesOpen)}>
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