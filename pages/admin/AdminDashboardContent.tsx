import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";
import { IoMdWifi } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import WeatherCard from '@/components/WeatherCard';
import TodoList from '@/components/TodoList';
import AdminSidebar from '@/components/ui/AdminSidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";

interface User {
  _id: string;
  name: string;
  email: string;
  lastLogin?: string;
  role: string;
  image?: string;
  createdAt?: string;
}

interface Friend {
  email: string;
  name: string;
  src: string;
}

const AdminDashboardContent = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [, setFriends] = useState<Friend[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [, setLastLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(0);
  const [, setInactiveUsers] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);

      if (user.lastLogin) {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };

        let formattedTime = new Date(user.lastLogin).toLocaleString("en-IN", options);

        // Insert comma manually after the date
        formattedTime = formattedTime.replace(/^(\d{2} \w{3} \d{2})/, "$1");

        // Convert am/pm to uppercase AM/PM
        formattedTime = formattedTime.replace(/\b(am|pm)\b/g, (match) => match.toUpperCase());

        setLastLogin(formattedTime);
      } else {
        setLastLogin("N/A");
      }
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const active = users.filter(user =>
        user.lastLogin && new Date(user.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000
      ).length;
      const inactive = users.length - active;
      setActiveUsers(active);
      setInactiveUsers(inactive);
    }
  }, [users]);

  const fetchDashboardData = async () => {
    try {
      const userResponse = await fetch("/api/users");
      const feedbackCountResponse = await fetch("/api/feedback/count");

      if (!userResponse.ok) throw new Error("Failed to fetch users");
      const userData = await userResponse.json();
      setUsers(userData);
      setUserCount(userData.length);

      if (!feedbackCountResponse.ok) {
        console.error("Error fetching feedback count");
        setFeedbackCount(0);
      } else {
        const { count } = await feedbackCountResponse.json();
        setFeedbackCount(count);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen text-white">
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className={`flex-1 p-10 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0 md:ml-12 lg:ml-12"}`}>
        <h1 className="text-3xl ml-7 -mt-4 md:ml-0 lg:ml-0 lg:-mt-4 mb-5 lg:mb-7
         font-bold text-gray-100 ">Welcome, {userName} 👋</h1>

        <div className="grid grid-cols md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-6">
          <div className="flex flex-col">
            <h2 className="text-md md:text-lg lg:text-lg font-semibold
            font-poppins text-gray-200 opacity-80 mb-4 mt-3 md:ml-0 lg:mt-0">Weather</h2>
            <div className="min-h-[200px] lg:h-full ">
              <WeatherCard /> </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-md md:text-lg lg:text-lg font-semibold font-poppins text-gray-200 opacity-80 mb-4">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Card 01 */}
              <div className="p-10 bg-gradient-to-r from-[#2f2812f7] to-[#161204f7] shadow-xl rounded-xl flex items-center
               outline outline-1 outline-white/0 hover:outline-1 hover:outline-[#2f2812f7] transition-all">
                <LuUsersRound className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3 " />
                <div className="ml-4">
                  <p className="text-lg font-semibold font-poppins text-gray-300">Total users</p>
                  <p className="text-2xl font-bold text-white">{userCount}</p>
                </div>
              </div>

              {/* Card 04 */}
              <div className="p-10  bg-gradient-to-r from-[#102f10] to-[#031603f7] shadow-xl rounded-xl                
              outline outline-1 outline-white/0 hover:outline-1 hover:outline-[#102f10] transition-all">

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IoMdWifi className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-5xl rounded-full p-3" />
                    <div className="ml-4">
                      <p className="text-lg font-semibold font-poppins text-gray-300">Active users</p>
                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-4 h-4 bg-green-300 rounded-full animate-ping ml-1"></div>
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full ml-1"></div>
                        </div>
                        <p className="text-2xl font-bold text-white ml-2 -mt-1">{activeUsers}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 03 */}
              <div className="p-10 bg-gradient-to-r from-[#2c0d2d] to-[#170618] shadow-xl rounded-xl flex items-center
              outline outline-1 outline-white/0 hover:outline-1 hover:outline-[#2c0d2d] transition-all">
                <RiCustomerServiceLine className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
                <div className="ml-4">
                  <p className="text-lg font-semibold font-poppins text-gray-300">Total tickets</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
              </div>

              {/* Card 02 */}
              <div className="p-10 bg-gradient-to-r from-[#202047f7] to-[#0a0a22] shadow-xl rounded-xl flex items-center
              outline outline-1 outline-white/0 hover:outline-1 hover:outline-[#202047f7] transition-all">
                <MdOutlineFeedback className="text-white text-[60px] bg-[#ffffff15] backdrop-blur-3xl rounded-full p-3" />
                <div className="ml-4">
                  <p className="text-lg font-semibold font-poppins text-gray-300">Feedbacks</p>
                  <p className="text-2xl font-bold text-white">{feedbackCount}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin List Card */}
          <div className="mt-5">
            <h2 className="text-md md:text-lg lg:text-lg font-semibold font-poppins text-gray-200 opacity-80 mb-4">Admins</h2>
            {loading ? (
              <p className="text-center opacity-50">Retrieving data from server, just a moment...</p>
            ) : (

              <table className="scale-[75%] ml-[-50px] -my-4 md:scale-100 lg:scale-100 md:m-0 lg:m-0 min-w-full bg-[#18191af7] font-poppins rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#27292af7] text-white font-medium">
                    <th className="p-3 max-w-[200px] text-left">
                      <span className="ml-6">Name</span></th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Last login</th>
                    <th className="p-3">Since</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.role === "admin").map((admin) => (
                    <tr
                      key={admin._id}
                      className="border-b border-[#27292af7] cursor-pointer hover:bg-[#232425]"
                      onClick={() => router.push('/admin/adminslist')}
                    >
                      <td className="p-3 text-left ml-4  md:absolute lg:absolute  text-gray-100 max-w-[200px] align-middle">
                        {admin.name}
                      </td>
                      <td className="p-3 text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger >
                              <span className="flex items-center justify-center cursor-pointer">
                                {admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000 ? (
                                  <>
                                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                                    Active
                                  </>
                                ) : (
                                  <>
                                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 ml-3"></span>
                                    Inactive
                                  </>
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000
                                ? "This admin was active in the last 48 hours"
                                : "This admin was inactive for more than 48 hours"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                        {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString("en-IN", {
                          day: '2-digit',
                          month: 'short',
                          year: '2-digit',
                        }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                          : 'N/A'}
                      </td>
                      <td className="p-3 text-center md:w-auto lg:w-auto w-full whitespace-nowrap">
                        {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: '2-digit' }) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="mt-5">
            <TodoList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardContent;