"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/"); // Redirect to login page if no token
    } else {
      setLoading(false); // Allow rendering if authenticated
    }
  }, [router]);

  if (loading) return null; // Prevent rendering until auth check is done

  return children;
};

export default AuthGuard;
