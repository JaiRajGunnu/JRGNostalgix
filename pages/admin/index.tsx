import withAuth from "@/guard/withAuth";
import AdminGuard from "./_layout";
import AdminDashboardContent from "./AdminDashboardContent";

const AdminDashboard = () => {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
};

export default withAuth(AdminDashboard);