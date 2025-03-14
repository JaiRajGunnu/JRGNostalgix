import { useState } from "react";
import Head from 'next/head';
import AdminGuard from "./_layout";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { CheckIcon } from "@heroicons/react/24/solid";

const AdminSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [privacy, setPrivacy] = useState("Admins only");
  // const [showDeactivateError, setShowDeactivateError] = useState(false);


// Function to handle privacy change
const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setPrivacy(e.target.value);
};


  return (
    <>
      <Head>
        <title>Settings - Admin Panel</title>
      </Head>
      
      <AdminGuard>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 z-30 h-full transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        


        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} min-h-screen w-full flex justify-center`}>
          <div className="absolute inset-0 -z-10 pointer-events-none">
          <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
          </div>

          {/* Main Container */}
          <div className="max-w-3xl w-full mx-auto p-6">
            {/* Page Header */}
            <div className="space-y-2 mt-12 mb-6 md:mb-10lg:mb-7">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your admin & members access settings.
              </p>
            </div>

            {/* Single Container for All Settings */}
            <div className="dark:bg-[#18191af7] shadow-lg rounded-2xl py-8 px-6 md:px-10 lg:px-15 space-y-6">
              {/* Master Admin */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Master Control
                </h3>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <div className="relative w-5 h-5 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600">
                    <CheckIcon className="w-4 h-4 text-white cursor-no-drop" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-400">Enable master admin</span>
                </label>
              </div>

              {/* Divider Line */}
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-3 mb-2 h-[1px] w-full" />

              {/* Theme Preference */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Your Master Admin
                </h3>
                <div className="flex flex-row justify-between items-baseline my-2">
                  <label
                    htmlFor="theme-select"
                    className="text-base font-normal text-gray-700 dark:text-gray-400"
                  >
                    Choose your master admin
                  </label>
                  <select
                    id="theme-select"
                    className="border scale-90 md:scale-100 lg:scale-100 border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#27292af7] dark:text-white"
                  >
                    <option>Jai Raj Gunnu</option>
                    <option disabled>Other</option>
                  </select>
                </div>
              </div>

              {/* Divider Line */}
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-3 mb-2 h-[1px] w-full" />

              {/* Access Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Access Settings
                </h3>
                <div className="flex flex-row justify-between items-baseline">
                  <label
                    htmlFor="access-select"
                    className="text-base font-normal text-gray-700 dark:text-gray-400"
                  >
                    Who can access admin panel?
                  </label>
                  <select
                    id="access-select"
                    className="border scale-90 md:scale-100 lg:scale-100 border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#27292af7] dark:text-white"
                    value={privacy}
                    onChange={handlePrivacyChange}
                  >
                    <option>Admins only</option>
                    <option disabled>Master Admin</option>
                  </select>
                </div>
              </div>

              {/* Divider Line */}
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-3 mb-2 h-[1px] w-full" />

              {/* Control Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Control Settings
                </h3>
                <div className="flex flex-row justify-between items-baseline">
                  <label
                    htmlFor="control-select"
                    className="text-base font-normal text-gray-700 dark:text-gray-400"
                  >
                    Who can access & control members?
                  </label>
                  <select
                    id="control-select"
                    className="border scale-90 md:scale-100 lg:scale-100 border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#27292af7] dark:text-white"
                    value={privacy}
                    onChange={handlePrivacyChange}
                  >
                    <option>Admins only</option>
                    <option disabled>Master Admin</option>
                  </select>
                </div>
              </div>
            </div>
            {/* End Single Container */}
          </div>
        </div>

      </div>
      </AdminGuard>
    </>
  );
};

export default AdminSettings;