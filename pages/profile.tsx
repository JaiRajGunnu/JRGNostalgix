"use client";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";
import { shortTestimonials as friends } from "@/components/ui/friends";
import DisableRightClick from '../components/disablerightclick';
import { EyeIcon, EyeSlashIcon, CheckIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { RiSpam2Line } from "react-icons/ri";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string>(
    "./img/guestavatar.svg" // Default image
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // For floating messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Fetch user profile data from API
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user?.name && data.user?.email) {
          setName(data.user.name);
          setEmail(data.user.email);

          // Match friend image from JSON
          const matchedFriend = friends.find(
            (friend) => friend.email === data.user.email
          );
          setProfileImage(
            matchedFriend
              ? matchedFriend.src
              : "./img/guestavatar.svg" // Default image

          );
        } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        }
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Make the new password field mandatory
    if (!password) {
      setLoading(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      const updatedData = { password };

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Clear password field
        setPassword("");

        // Refresh profile data
        await fetchProfile();
      } else {
        // Show error message
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Profile Settings</title>
      </Head>

      <SidebarLayout>
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
        </div>

        <div className="relative w-full min-h-screen flex justify-center mt-[-25%] md:mt-0 lg:mt-0
        items-center p-6 font-poppins flex-col space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
              Profile Settings
            </h2>
          </div>
          <div className="bg-white dark:bg-[#18191af7] rounded-2xl shadow-lg p-8 pt-25 w-full max-w-2xl">


            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Profile Picture Display */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-neutral-700 overflow-hidden">
                  <DisableRightClick>
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={100} // Set fixed width
                      height={100}
                      className="object-cover"
                    />
                  </DisableRightClick>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-[#27292af7] dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={name}
                  disabled
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-[#27292af7] dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={email}
                  disabled
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 ">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 block w-full px-4 py-2 mb-3 rounded-md dark:bg-[#27292af7]
                    dark:text-white border dark:border-gray-600
                    focus:ring focus:ring-blue-500 focus:border-none focus:outline-none pr-10"  // Reduced pr for better icon alignment
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a new password"
                    required // HTML required attribute
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 dark:text-gray-400" // Adjusted right position
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 " />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>


              {/* Save Changes Button */}
              <button
                type="submit"
                className="w-full bg-white text-black py-2 font-semibold rounded-md hover:pointer transition duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {/* Floating success message */}
            {showSuccess && (
        <div className="fixed m-5 bottom-5 right-0 md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]
        text-white px-5 py-3 rounded-lg shadow-lg border border-white/10 flex items-center gap-2">
          <CheckIcon className="w-6 h-6 text-green-500" />
            Password updated successfully.
              </div>
            )}

            {/* Floating error message */}
            {showError && (
            <div className="fixed m-5 bottom-5 right-0 md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]
            text-white px-5 py-3 rounded-lg shadow-lg border border-white/10 flex items-center gap-2">
                <RiSpam2Line className="w-6 h-6 text-red-500" />
                Session time expired.
              </div>
            )}
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default ProfileSettings;