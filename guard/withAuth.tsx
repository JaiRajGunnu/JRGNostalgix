import { useRouter } from "next/router";
import { useEffect, ComponentType, useState } from "react";

const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/auth/login");
          return;
        }

        // If token exists, set authorized to true
        setIsAuthorized(true);
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