import { FaUsers, FaComments, FaEye, FaLock } from "react-icons/fa";  
import Link from "next/link";

const AdminSidebar = () => {
  const links = [
    { label: "Dashboard", href: "/admin", icon: <FaEye className="h-6 w-6" /> },
    { label: "Users", href: "/admin/users", icon: <FaUsers className="h-6 w-6" /> },
    { label: "Admins List", href: "/admin/adminslist", icon: <FaLock className="h-6 w-6" /> },
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
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar; 