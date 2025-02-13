"use client";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";
import { fakeTestimonials as friends } from "@/components/ui/friends";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PyKYrBKAWWy6YCbQzWQcwIRqH8wYMPluIZiMpV1w0NYSbocTZz0ICWFkLcXhaMyvCwQ&usqp=CAU" // Default image
  );
  const [loading, setLoading] = useState(false);

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
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PyKYrBKAWWy6YCbQzWQcwIRqH8wYMPluIZiMpV1w0NYSbocTZz0ICWFkLcXhaMyvCwQ&usqp=CAU"
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

        <div className="relative w-full min-h-screen flex justify-center items-center p-6">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 pt-25 w-full max-w-2xl">
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
              Profile Settings
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Profile Picture Display */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-neutral-700 overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
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
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={email}
                  disabled
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500 focus:border-none focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a new password"
                  required // HTML required attribute
                />
              </div>

              {/* Save Changes Button */}
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-md hover:pointer transition duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {/* Floating success message */}
            {showSuccess && (
              <div className="fixed bottom-5 right-5 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
                Password updated successfully! 🚀
              </div>
            )}

            {/* Floating error message */}
            {showError && (
              <div className="fixed bottom-5 right-5 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
                Password updation failed.
              </div>
            )}
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default ProfileSettings;
