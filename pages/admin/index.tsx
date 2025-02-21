import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import { FaUsers, FaComments, FaEye } from "react-icons/fa";
import WeatherCard from '@/components/ui/WeatherCard';
import TodoList from '@/components/ui/TodoList';
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface User {
  _id: string;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

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
    try {
      const userResponse = await fetch("/api/users");
      const feedbackCountResponse = await fetch("/api/feedback/count");
      const viewsCountResponse = await fetch("/api/views/count");

      if (!userResponse.ok) {
        const contentType = userResponse.headers.get("content-type");
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await userResponse.json();
        } else {
          errorData = await userResponse.text();
        }
        console.error("Error fetching users:", errorData);
        setUserCount(0);
      } else {
        const usersData = await userResponse.json();
        setUsers(usersData);
        setUserCount(usersData.length);
      }

      if (!feedbackCountResponse.ok) {
        const contentType = feedbackCountResponse.headers.get("content-type");
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await feedbackCountResponse.json();
        } else {
          errorData = await feedbackCountResponse.text();
        }
        console.error("Error fetching feedback count:", errorData);
        setFeedbackCount(0);
      } else {
        const { count } = await feedbackCountResponse.json();
        setFeedbackCount(count);
      }

      if (!viewsCountResponse.ok) {
        const contentType = viewsCountResponse.headers.get("content-type");
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await viewsCountResponse.json();
        } else {
          errorData = await viewsCountResponse.text();
        }
        console.error("Error fetching views count:", errorData);
        setViewsCount(0);
      } else {
        const { count } = await viewsCountResponse.json();
        setViewsCount(count);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setUserCount(0);
      setFeedbackCount(0);
      setViewsCount(0);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (

  
    <div className="flex min-h-screen  text-white">
          <div className="absolute inset-0 -z-10 pointer-events-none">
    <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
  </div>

      <AdminSidebar />
      <main className="flex-1 p-10 ml-64">
        <h1 className="text-3xl font-bold text-gray-100 mb-10">Welcome, Admin 👋</h1>

        <div className="flex grid grid-cols-2 gap-6">
          <div>
            <WeatherCard />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">

            {/* Card 01 */}
            <div className="p-10 bg-gradient-to-r from-[#2f2812f7] to-[#161204f7] shadow-lg rounded-xl flex items-center h-50">
              <FaUsers className="text-white text-[65px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-300">Users</p>
                <p className="text-2xl font-bold text-white">{userCount}</p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-10 bg-gradient-to-r from-[#202047f7] to-[#0a0a22] shadow-lg rounded-xl flex items-center h-50">
              <FaComments className="text-white text-[65px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-300">Feedbacks</p>
                <p className="text-2xl font-bold text-white">{feedbackCount}</p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="p-10 bg-gradient-to-r from-[#2c0d2d] to-[#170618] shadow-lg rounded-xl flex items-center h-50">
              <FaEye className="text-white text-[65px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-300">Total Views</p>
                <p className="text-2xl font-bold text-white">{viewsCount}</p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="p-10 bg-gradient-to-r from-[#102f10] to-[#031603f7] shadow-lg rounded-xl flex items-center h-50">
              <FaEye className="text-white text-[65px] bg-[#ffffff15] backdrop-blur-5xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-300">Total Tickets</p>
                <p className="text-2xl font-bold text-white">{viewsCount}</p>
              </div>
            </div>


          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">

          {/* User List Card */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">User List</h2>
            <ul className="list-disc pl-5">
              {users.map((user) => (
                <li key={user._id} className="text-gray-100">
                  {user.name}
                </li>
              ))}
            </ul>
          </div>

          {/* TODO List Card */}
          <div className="mt-10">
            <TodoList />
          </div>
        </div>

      </main>
    </div>
  );
};

export default withAuth(AdminDashboard);
