import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminSidebar from '@/components/ui/AdminSidebar';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string; // Assuming role can be "admin" or "user"
}

const AdminsPage = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<{ admins: Admin[] }>("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(response.data.admins);
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <main className="flex-1 p-10 ml-64">
        <h1 className="text-4xl font-bold text-center mb-6">Admin List</h1>
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-b border-gray-600">
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default withAuth(AdminsPage);
