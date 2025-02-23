// pages\admin\users.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { shortTestimonials } from "@/components/ui/friends";
import { CheckIcon } from "@heroicons/react/24/solid";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAdmin(true);
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<User[]>("/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching users:", error.message);
      } else {
        console.error("Unexpected error:", String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    const allSelected = users.length > 0 && Object.keys(selectedUsers).length === users.length && Object.values(selectedUsers).every(Boolean);
    const newSelectedUsers: { [key: string]: boolean } = {};
    
    users.forEach(user => {
      newSelectedUsers[user._id] = !allSelected;
    });
    
    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      await axios.put(`/api/users/${userId}`, { isAdmin: !isAdmin });
      setUsers(users.map(user => user._id === userId ? { ...user, isAdmin: !isAdmin } : user));
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen text-white">

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
      </div>

      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />


      <main className={`flex-1 p-10 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-12"}`}>
        <h1 className="text-4xl font-bold text-center mt-5 mb-10">Member's Dashboard</h1>
        {loading ? (
          <p className="text-center">Retrieving data from server, just a moment...</p>
        ) : (
          <table className="w-full bg-[#18191af7] rounded-lg overflow-hidden">
            <thead>
              
              <tr className="bg-[#27292af7] text-white font-poppins font-semibold">
                <th className="p-3">
                  <aside
                    onClick={handleSelectAll}
                    className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${users.length > 0 && Object.keys(selectedUsers).length === users.length && Object.values(selectedUsers).every(Boolean) ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
                  >
                    {users.length > 0 && Object.keys(selectedUsers).length === users.length && Object.values(selectedUsers).every(Boolean) && <CheckIcon className="w-3 h-3 text-white" />}
                  </aside>
                </th>
                <th className="p-3">
                  Name
                </th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last login</th>
                <th className="p-3">Member since</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const friend = shortTestimonials.find(friend => friend.email === user.email);
                return (
                  <tr key={user._id} className="border-b border-[#27292af7]">
                    <td className="p-3 text-center">
                      <div
                        onClick={() => handleSelectUser(user._id)}
                        className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${!!selectedUsers[user._id] ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
                      >
                        {selectedUsers[user._id] && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>  
                    </td>

                    <td className="p-3 text-center">

                      <div className="flex flex-row gap-2 justify-start ml-[30%]">
                        <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={user.name} 
                             className="w-7 h-7 rounded-full" />
                        {user.name}
                      </div>
                      
                    </td>
                    <td className="p-3 text-center">{user.email}</td>
                    <td className="p-3 text-center">
                      {user.lastLogin && new Date(user.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000 ? (
                        <span className="flex items-center">
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                    : 'N/A'}
                    </td>
                    <td className="p-3 text-center">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="p-3 text-center">
                      <div className="relative group">
                        <div className=" transition-opacity duration-300">
                          <button onClick={() => toggleAdmin(user._id, user.isAdmin)} className="bg-[#18191af7] border border-white hover:border-green-500 text-white opacity-30 hover:opacity-100 hover:text-green-500 px-3 py-1 rounded mr-4">
                            {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                          </button>
                          <button onClick={() => deleteUser(user._id)} className="bg-[#18191af7] border border-white hover:border-red-500 text-white opacity-30 hover:opacity-100 hover:text-red-500 px-3 py-1 rounded">
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default withAuth(AdminDashboard);
