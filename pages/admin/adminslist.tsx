import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { shortTestimonials } from "@/components/ui/friends";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string; // Assuming role can be "admin" or "user"
  lastLogin?: string; // Include lastLogin field
  isActive: boolean; // Add isActive field for status
  createdAt?: string;
}

const AdminsPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmins, setSelectedAdmins] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAdmin(true);
      fetchAdmins();
    }
  }, [router]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get<Admin[]>("/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const adminUsers = response.data.filter(user => user.role == "admin");
      setAdmins(adminUsers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching admins:", error.message);
      } else {
        console.error("Unexpected error:", String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    const allSelected = admins.length > 0 && Object.keys(selectedAdmins).length === admins.length && Object.values(selectedAdmins).every(Boolean);
    const newSelectedAdmins: { [key: string]: boolean } = {};
    
    admins.forEach(admin => {
      newSelectedAdmins[admin._id] = !allSelected;
    });
    
    setSelectedAdmins(newSelectedAdmins);
  };

  const handleSelectAdmin = (adminId: string) => {
    setSelectedAdmins(prev => ({ ...prev, [adminId]: !prev[adminId] }));
  };

  const deleteAdmin = async (adminId: string) => {
    try {
      await axios.delete(`/api/users/${adminId}`);
      setAdmins(admins.filter((admin) => admin._id !== adminId));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const toggleAdmin = async (userId: string, currentRole: string) => {
    try {
      const token = localStorage.getItem('token');
      const newRole = currentRole === "admin" ? "user" : "admin";
      
      const response = await axios.put(`/api/users?id=${userId}`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (response.data) {
        setAdmins(admins.filter(admin => admin._id !== userId));
      }
    } catch (error) {
      console.error("Error updating user role:", error);
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
        <h1 className="text-4xl font-bold text-center mt-5 mb-10">Admin List</h1>
        {loading ? (
          <p className="text-center opacity-50">Retrieving data from server, just a moment...</p>
        ) : (
          <table className="w-full bg-[#18191af7] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#27292af7] text-white font-poppins font-semibold ">
                <th className="p-3">
                  <aside
                    onClick={handleSelectAll}
                    className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${admins.length > 0 && Object.keys(selectedAdmins).length === admins.length && Object.values(selectedAdmins).every(Boolean) ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
                  >
                    {admins.length > 0 && Object.keys(selectedAdmins).length === admins.length && Object.values(selectedAdmins).every(Boolean) && <CheckIcon className="w-3 h-3 text-white" />}
                  </aside>
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">E-mail</th>
                <th className="p-3">Role</th>
                <th className="p-3">Admin since</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last login</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => {
                const friend = shortTestimonials.find(friend => friend.email === admin.email);
                return (
                  <tr key={admin._id} className="border-b border-[#27292af7] hover:bg-[#232425]">
                    <td className="p-3 text-center">
                      <div
                        onClick={() => handleSelectAdmin(admin._id)}
                        className={`w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer ${!!selectedAdmins[admin._id] ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
                      >
                        {selectedAdmins[admin._id] && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>  
                    </td>
                    <td className="p-3 text-center max-w-[150px]">
                      <div className="flex flex-row gap-3 justify-start  ">
                        <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={admin.name} className="w-7 h-7 rounded-full" />
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap cursor-help" title={admin.name}>{admin.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{admin.email}</td>
                    <td className="p-3 text-center capitalize">{admin.role}</td>
                    <td className="p-3 text-center">{admin.createdAt ? new Date(admin.createdAt).toLocaleString("en-IN", {
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
                    {admin.lastLogin && new Date(admin.lastLogin).getTime() > Date.now() - 48 * 60 * 60 * 1000 ? (
                        <span className="flex items-center justify-center ml-0" title={`This admin was active in the last 48 hours`}>
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center justify-center cursor-help" title={`This admin was inactive for more than 48 hours`}>
                          <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString("en-IN", {
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
                      <div className="relative group">
                        <div className="transition-opacity duration-300">
                          {admin.email === "jairajgsklm@gmail.com" ? (
                            <button title="This is the primary admin account, no changes can be made to it."
                            className="scale-[85%] bg-[#18191af7] border border-gray-500 hover:border-blue-500  text-gray-500 hover:text-blue-500 pacity-30 px-3 py-1 rounded cursor-help"
                          > Master Admin
                          </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => toggleAdmin(admin._id, admin.role)}
                                className="scale-[85%] bg-[#18191af7] border border-white hover:border-red-500 text-white opacity-30 hover:opacity-100 hover:text-red-500 px-3 py-1 rounded"
                              >
                                Revoke Admin
                              </button>
                              <button 
                                onClick={() => deleteAdmin(admin._id)} 
                                className="scale-[85%] bg-[#18191af7] border border-white hover:border-red-500 text-white opacity-30 hover:opacity-100 hover:text-red-500 px-3 py-1 rounded ml-2"
                              >
                                Delete
                              </button>
                            </>
                          )}
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

export default withAuth(AdminsPage);
