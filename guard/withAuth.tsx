import { useRouter } from "next/router";
import { useEffect, ComponentType, useState } from "react";

const withAuth = (WrappedComponent: ComponentType<any>, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        console.log("Checking authentication..."); // Debug log
        
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        
        console.log("Token exists:", !!token); // Debug log
        console.log("User string:", userStr); // Debug log
        
        if (!token) {
          console.log("No token found, redirecting to login");
          router.replace("/auth/login");
          return;
        }

        try {
          const user = JSON.parse(userStr || "{}");
          console.log("Parsed user data:", user); // Debug log
          console.log("User role:", user.role);
          console.log("Allowed roles:", allowedRoles);
          
          if (!user.role) {
            console.log("No role found in user data");
            router.replace("/auth/login");
            return;
          }

          if (!allowedRoles.includes(user.role)) {
            console.log(`Role ${user.role} not in allowed roles:`, allowedRoles);
            router.replace("/");
            return;
          }
          
          console.log("Authorization successful"); // Debug log
          setIsAuthorized(true);
        } catch (error) {
          console.error("Auth check error:", error);
          router.replace("/auth/login");
        }
      };

      checkAuth();
    }, [router]);

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;