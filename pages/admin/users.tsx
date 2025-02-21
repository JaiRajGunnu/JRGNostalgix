// pages\admin\users.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";
import axios from "axios";
import AdminSidebar from '@/components/ui/AdminSidebar';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <main className="flex-1 p-10 ml-64">
        <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>
        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : (
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-600">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.isAdmin ? "Admin" : "User"}</td>
                  <td className="p-3">
                    <button onClick={() => toggleAdmin(user._id, user.isAdmin)} className="bg-blue-500 px-4 py-2 rounded mr-2">{user.isAdmin ? "Revoke Admin" : "Make Admin"}</button>
                    <button onClick={() => deleteUser(user._id)} className="bg-red-500 px-4 py-2 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default withAuth(AdminDashboard);
