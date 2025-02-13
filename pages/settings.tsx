"use client";
import { useState } from "react";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

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
        <div className="relative min-h-screen w-full flex justify-center items-start p-6">
          <div className="max-w-3xl w-full mx-auto space-y-8">
            {/* Page Header */}
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your account settings, theme preferences, and more.
              </p>
            </div>

            {/* 1) Notifications */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Notifications
              </h3>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Receive Email Notifications
                </span>
              </label>
            </div>

            {/* 2) Theme Customization */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6 space-y-4 ">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Theme Preference
              </h3>
              <div className="flex flex-row justify-between items-baseline">
                <label
                  htmlFor="theme-select"
                  className="text-base font-normal text-gray-700 dark:text-gray-300"
                >
                  Choose your preferred theme
                </label>
                <select
                  id="theme-select"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
                >
                  <option>Dark theme</option>
                  <option disabled>Light theme</option>
                  <option disabled>System default</option>
                </select>
              </div>
            </div>

            {/* 3) Privacy Settings */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Privacy Settings
              </h3>
              <div className="flex flex-row justify-between items-baseline">
                <label
                  htmlFor="privacy-select"
                  className="text-base font-normal text-gray-700 dark:text-gray-300"
                >
                  Who can see your profile?
                </label>
                <select
                  id="privacy-select"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
                > <option>Friends Only</option>
                  <option>Private</option>
                  <option disabled>Public</option>
                </select>
              </div>
            </div>

            {/* 4) Account Settings */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Account Settings
              </h3>
              <div className="flex flex-row justify-between items-baseline">

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-base font-normal text-gray-700 dark:text-gray-300 mb-1"
                >
                  Are you sure you want to delete your account?
                </label>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600">
                Delete Account
              </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Settings;
