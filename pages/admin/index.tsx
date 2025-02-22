import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { RiCustomerServiceLine } from "react-icons/ri";
import WeatherCard from '@/components/ui/WeatherCard';
import TodoList from '@/components/ui/TodoList';
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface User {
  _id: string;
  name: string;
  email: string;
  lastLogin?: string;
  role: string;
}

interface Friend {
  email: string;
  name: string;
  src: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAdmin(true);
      fetchDashboardData();
    }
  }, [router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []);

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

      const friendsResponse = await fetch("/api/friends");
      if (!friendsResponse.ok) {
        console.error("Error fetching friends data");
        setFriends([]);
      } else {
        const friendsData = await friendsResponse.json();
        setFriends(friendsData);
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
        <h1 className="text-3xl font-bold text-gray-100 mb-10">Welcome, {userName} 👋</h1>
        <div className="flex grid grid-cols-2 gap-20">
          <div className="">
          <h2 className="text-lg font-semibold font-poppins text-gray-200 mb-4">Weather</h2>
            <WeatherCard />
          </div>
          <div className="ml-[45px] grid grid-rows">
          <h2 className="text-lg font-semibold font-poppins text-gray-200 ">Analytics</h2>
          <div className=" grid grid-cols-2 gap-5 mt-[-60px]">

            {/* Card 01 */}
            <div className=" grid grid-cols-1 gap-y-5 ">
            <div className="p-10 bg-gradient-to-r from-[#2f2812f7] to-[#161204f7] shadow-xl rounded-xl flex items-center h-47 w-[85%]">
            <LuUsersRound 
            className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold font-poppins text-gray-300">Users</p>
                <p className="text-2xl font-bold text-white">{userCount}</p>
              </div>
            </div>

            {/* Card 03 */}
            <div className=" p-10 bg-gradient-to-r from-[#102f10] to-[#031603f7] shadow-xl rounded-xl flex items-center h-47 w-[100%]">
            <RiCustomerServiceLine 
            className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold font-poppins text-gray-300">Total Tickets</p>
                <p className="text-2xl font-bold text-white">{viewsCount}</p>
              </div>
            </div>
            </div>


            <div className=" grid grid-rows-2 gap-5 ">

            {/* Card 04 */}
            <div className="ml-[-45px]  p-10 bg-gradient-to-r from-[#2c0d2d] to-[#170618] shadow-xl rounded-xl flex items-center h-47 w-[105%]">

            <FaChartLine  className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-5xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold font-poppins text-gray-300">Total Views</p>
                <p className="text-2xl font-bold text-white">{viewsCount}</p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="p-10 bg-gradient-to-r from-[#202047f7] to-[#0a0a22] shadow-xl rounded-xl flex items-center h-47 w-[90%]">
            <MdOutlineFeedback
                        className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
              <div className="ml-4">
                <p className="text-lg font-semibold font-poppins text-gray-300">Feedbacks</p>
                <p className="text-2xl font-bold text-white">{feedbackCount}</p>
              </div>
            </div>
            </div>

          </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">

          {/* Admin List Card */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold font-poppins text-gray-200 mb-4">Admins</h2>
            <table className="min-w-full bg-[#18191af7] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#27292af7] text-white">
                  <th className="p-3">Admin</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(user => user.role === "admin").map((admin) => {
                  return (
                    <tr key={admin._id} className="border-b border-gray-600">
                      <td className="p-3">
                        <div className="w-10 h-10 rounded-full bg-gray-500"></div>
                      </td>
                      <td className="p-3 text-gray-100">{admin.name}</td>
                      <td className="p-3 text-gray-100">
                        {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TODO List Card */}

          <div className="mt-5">

            <TodoList />
          </div>
        </div>

      </main>
    </div>
  );
};

export default withAuth(AdminDashboard);
