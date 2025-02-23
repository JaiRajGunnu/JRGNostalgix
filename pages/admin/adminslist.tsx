import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminSidebar from '@/components/ui/AdminSidebar';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { shortTestimonials } from "@/components/ui/friends";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string; // Assuming role can be "admin" or "user"
  lastLogin?: string; // Include lastLogin field
}

const AdminsPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

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
      const adminUsers = response.data.filter(user => user.role === "admin");
      setAdmins(adminUsers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching admins:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return <p className="text-center">Loading admins...</p>;
  }

  return (
    <div className="flex min-h-screen text-white">

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
      </div>

      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <main className={`flex-1 p-10 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-12"}`}>

        <h1 className="text-4xl font-bold  text-center mb-6">Admin List</h1>
        <table className="w-full bg-[#18191af7] rounded-lg font-poppins overflow-hidden">
          <thead>
            <tr className="bg-[#27292af7] text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Last login</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const friend = shortTestimonials.find(friend => friend.email === admin.email);
              return (
                <tr key={admin._id} className="border-b border-[#27292af7]">
                  <td className="p-3 text-center">
                  <div className="flex flex-row gap-2 justify-start ml-[30%]">
                  <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={admin.name} 
                    className="w-7 h-7 rounded-full" />
                    {admin.name}
                    </div>
                  </td>
                  <td className="p-3 text-center">{admin.email}</td>
                  <td className="p-3 text-center">{admin.role}</td>
                  <td className="p-3 text-center">
                    {admin.lastLogin
                      ? new Date(admin.lastLogin).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())
                      : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default withAuth(AdminsPage);
