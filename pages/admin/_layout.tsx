import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import AccessDenied from "@/components/layouts/AccessDenied";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/auth/login");
          return;
        }
        
        // Get user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Check if user has admin role
          if (user.role === "admin") {
            setIsAdmin(true);
          } else {
            // User is authenticated but not an admin
            setIsAdmin(false);
          }
        } else {
          // If user data not in localStorage, fetch from API
          const userResponse = await fetch("/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setIsAdmin(userData.role === "admin");
            
            // Save updated user data to localStorage
            localStorage.setItem("user", JSON.stringify(userData));
          } else {
            // API request failed - redirect to login
            localStorage.removeItem("token");
            router.replace("/auth/login");
          }
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
        </div>
        <div className="text-white text-xl">Loading ...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{isAdmin ? "Admin Dashboard" : "Access Denied"}</title>
      </Head>
      <div className="min-h-screen text-white">
        <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
        </div>

        {isAdmin ? (
          children
        ) : (
          <AccessDenied message="You are not authorized to access this content" />
        )}
      </div>
    </>
  );
};

export default AdminGuard;