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
    'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png' // Default image
  );
  const [loading, setLoading] = useState(false);

  // Fetch user profile data from API on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in!");
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setName(data.user.name);
          setEmail(data.user.email);

          // Find matching friend by email
          const matchedFriend = friends.find(friend=> friend.email === data.user.email);
          if (matchedFriend) {
            setProfileImage(matchedFriend.src);
          }
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in!");
      return;
    }

    const updatedData = {
      name,
      email,
      password: password || undefined,
    };

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert("Profile updated successfully! 🚀");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
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
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 w-full max-w-2xl">
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
                <label className="block text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={true}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default ProfileSettings;