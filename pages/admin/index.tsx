import withAuth from "@/guard/withAuth";
import AdminGuard from "./_layout";
import AdminDashboardContent from "./AdminDashboardContent";

const AdminDashboard = () => {
  return (
    <AdminGuard>
      <div className="overflow-hidden">
      <AdminDashboardContent/></div>
    </AdminGuard>
  );
};

export default withAuth(AdminDashboard);