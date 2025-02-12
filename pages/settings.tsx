"use client";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";
const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <>   

      <Head>
        <title>Profile Settings</title>
      </Head>

      <SidebarLayout>     
    <div className="max-w-2xl mx-auto p-6">

        <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
        </div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Account Settings */}
      <div className="bg-neutral-100 dark:bg-neutral-800 shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
        <input type="password" placeholder="New Password" className="w-full border p-2 rounded mb-3" />
        <button className="bg-red-500 text-white px-4 py-2 rounded">Delete Account</button>
      </div>

      {/* Theme Customization */}
      <div className="bg-neutral-100 dark:bg-neutral-800 shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Theme Customization</h3>
        <label className="flex items-center space-x-3">
          <span>Enable Dark Mode</span>
          <select className="w-full border p-2 rounded">
          <option>System default</option>
          <option>Light theme</option>
          <option>Dark theme</option>
        </select>
        </label>
      </div>

      {/* Notifications */}
      <div className="bg-neutral-100 dark:bg-neutral-800 shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Notifications</h3>
        <label className="flex items-center space-x-3">
          <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="w-5 h-5" />
          <span>Receive Email Notifications</span>
        </label>
      </div>

      {/* Privacy Settings */}
      <div className="bg-neutral-100 dark:bg-neutral-800 shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Privacy Settings</h3>
        <select className="w-full border p-2 rounded">
          <option>Public</option>
          <option>Friends Only</option>
          <option>Private</option>
        </select>
      </div>
    </div>
    </SidebarLayout>
    </>
  );
};

export default Settings;
