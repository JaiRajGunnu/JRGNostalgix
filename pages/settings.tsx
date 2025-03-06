"use client";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid"; // <-- Import CheckIcon
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";

const Settings = () => {
  // const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("Friends only"); // Default
  const [showDeactivateError, setShowDeactivateError] = useState(false);

  // On mount, load privacy setting from localStorage
  useEffect(() => {
    const storedPrivacy = localStorage.getItem("privacySetting");
    if (storedPrivacy) {
      setPrivacy(storedPrivacy);
    }
  }, []);

  // Handle Deactivate
  const handleDeactivate = () => {
    // Show the floating message
    setShowDeactivateError(true);
    // Hide after 3 seconds
    setTimeout(() => {
      setShowDeactivateError(false);
    }, 3000);
  };

  // Handle Privacy Change
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setPrivacy(newValue);
    localStorage.setItem("privacySetting", newValue); // Save to localStorage
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <SidebarLayout>
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
        </div>

        {/* Main Container */}
        <div className="relative min-h-screen w-full flex justify-center items-start p-6 font-poppins">
          <div className="max-w-3xl w-full mx-auto">
            {/* Page Header */}
            <div className="space-y-2 mb-6 mt-0 md:mt-5 md:mb-10 lg:mt-10 lg:mb-7">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your account settings, themes, and more.
              </p>
            </div>

            {/* Single Container for All Settings */}
            <div className="dark:bg-[#18191af7] shadow-lg rounded-2xl py-8 px-6 md:px-10 lg:px-15 space-y-6">
              {/* Notifications */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Notifications
                </h3>
                <label className="flex items-center space-x-3 cursor-pointer select-none ml-[-10px]">
                  {/* Hidden input just for accessibility, actual UI is the custom box */}
                  <input
                    type="checkbox"
                    // checked={notifications}
                    // onChange={() => setNotifications(!notifications)}
                    className="hidden" disabled
                  />
                  {/* Custom checkbox container */}
                  <div
                    // onClick={() => setNotifications(!notifications)}
                    className={`relative w-5 h-5 flex items-center justify-center rounded border 
                      border-gray-300 dark:border-gray-600  bg-transparent
                      transition-colors focus:outline-none focus:ring-2 
                      focus:ring-blue-500 dark:bg-[#27292af7]`}
                  >
                     <CheckIcon className="w-4 h-4 text-white cursor-no-drop" />
                  </div>

                  <span className="text-gray-700 dark:text-gray-400">
                    Receive Email Notifications
                  </span>
                </label>
              </div>

              {/* Divider Line */}
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-3 mb-2 h-[1px] w-full" />

              {/* Theme Preference */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Theme Preference
                </h3>
                <div className="flex flex-row justify-between items-baseline my-2">
                  <label
                    htmlFor="theme-select"
                    className="text-base font-normal text-gray-700 dark:text-gray-400"
                  >
                    Choose your preferred theme
                  </label>
                  <select
                    id="theme-select"
                    className="border  scale-90 md:scale-100 lg:scale-100  border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#27292af7] dark:text-white"
                  >
                    <option>Dark theme</option>
                    <option disabled>Light theme</option>
                    <option disabled>System default</option>
                  </select>
                </div>
              </div>

              {/* Divider Line */}
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-3 mb-2 h-[1px] w-full" />

              {/* Privacy Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Privacy Settings
                </h3>
                <div className="flex flex-row justify-between items-baseline">
                  <label
                    htmlFor="privacy-select"
                    className="text-base font-normal text-gray-700 dark:text-gray-400"
                  >
                    Who can see your profile?
                  </label>
                  <select
                    id="privacy-select"
                    className="border  scale-90 md:scale-100 lg:scale-100  border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#27292af7] dark:text-white"
                    value={privacy}
                    onChange={handlePrivacyChange}
                  >
                    <option>Friends only</option>
                    <option>Private</option>
                    <option disabled>Public</option>
                  </select>
                </div>
              </div>

              {/* Divider Line */}
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-3 mb-2 h-[1px] w-full" />

              {/* Account Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Account Settings
                </h3>
                <div className="flex flex-row justify-between items-baseline">
                  <label
                    htmlFor="delete-account"
                    className="block text-base font-normal text-gray-700 dark:text-gray-400"
                  >
                    Are you sure you want to deactivate your account?
                  </label>
                  <button
                    onClick={handleDeactivate}
                    className="dark:bg-[#27292af7] scale-90 md:scale-100 lg:scale-100 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
            {/* End Single Container */}
          </div>
        </div>

        {/* Floating error message */}
        {showDeactivateError && (
          <div className="fixed m-5 bottom-5 right-0  md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
            Sorry, only Master Admin can deactivate your account.
          </div>
        )}
      </SidebarLayout>
    </>
  );
};

export default Settings;
