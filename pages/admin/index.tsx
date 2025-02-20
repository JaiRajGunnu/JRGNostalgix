import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import { FaUsers, FaComments } from "react-icons/fa";

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAdmin(true);
      fetchDashboardData();
    }
  }, [router]);

  const fetchDashboardData = async () => {
    // Simulated API call to fetch user and feedback counts
    setUserCount(5); // Replace with actual API response
    setFeedbackCount(8); // Replace with actual API response
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-200 p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="mt-6">
          <ul>
            <li className="mt-4 cursor-pointer hover:text-gray-400">Dashboard</li>
            <li className="mt-4 cursor-pointer hover:text-gray-400">Users</li>
            <li className="mt-4 cursor-pointer hover:text-gray-400">Feedbacks</li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-100">Welcome, Admin 👋</h1>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="p-6 bg-gray-800 shadow-lg rounded-lg flex items-center">
            <FaUsers className="text-green-400 text-4xl" />
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-300">Users</p>
              <p className="text-2xl font-bold text-gray-100">{userCount}</p>
            </div>
          </div>
          <div className="p-6 bg-gray-800 shadow-lg rounded-lg flex items-center">
            <FaComments className="text-blue-400 text-4xl" />
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-300">Feedbacks</p>
              <p className="text-2xl font-bold text-gray-100">{feedbackCount}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(AdminDashboard);
