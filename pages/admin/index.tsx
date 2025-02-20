// pages\admin\index.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "@/guard/withAuth";




const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role === "admin") {
      setIsAdmin(true);
    } else {
      router.replace("/");
    }    
    
  }, []);

  if (!isAdmin) return null; // Prevent rendering before checking role

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Admin Dashboard</h1>
    </div>
  );
};

export default withAuth(AdminDashboard, ["admin"]);
