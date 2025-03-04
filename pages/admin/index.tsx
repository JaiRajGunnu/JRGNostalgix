import withAuth from "@/guard/withAuth";
import AdminGuard from "./_layout";
import AdminDashboardContent from "./AdminDashboardContent";
import Head from 'next/head';

const AdminDashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard  - Admin Panel</title>
      </Head>

    <AdminGuard>
      <div className="overflow-hidden">
      <AdminDashboardContent/></div>
    </AdminGuard>
    </>

  );
};

export default withAuth(AdminDashboard);