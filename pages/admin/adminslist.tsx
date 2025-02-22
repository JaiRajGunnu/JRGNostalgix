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
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Admin[]>("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter admins from the response
        const adminUsers = response.data.filter(admin => admin.role === "admin");
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

    fetchAdmins();
  }, []);

  if (loading) {
    return <p className="text-center">Loading admins...</p>;
  }

  return (
    <div className="flex min-h-screen text-white">

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
      </div>

      <AdminSidebar />
      <main className="flex-1 p-10 ml-64">

        <h1 className="text-4xl font-bold text-center mb-6">Admin List</h1>
        <table className="w-full bg-[#18191af7] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#27292af7] text-white">
              <th className="p-3">Picture</th>
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
                  <td className="p-3">
                    <img src={friend ? friend.src : "/img/guestavatar.svg"} alt={admin.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">{admin.role}</td>
                  <td className="p-3">
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
