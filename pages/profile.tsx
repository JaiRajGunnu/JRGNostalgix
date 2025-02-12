"use client";
import { useState } from "react";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";

const ProfileSettings = () => {
  const [name, setName] = useState("Jai Raj Gunnu");
  const [email, setEmail] = useState("jairaj@example.com");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully! 🚀");
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Profile Settings</title>
      </Head>

      <SidebarLayout>
        {/* Background Beams moved outside and given pointer-events-none */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>

        </div>

        <div className="relative w-full min-h-screen flex justify-center items-center p-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
              Profile Settings
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center">
                <label htmlFor="profileImage" className="cursor-pointer">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-500">
                      Upload
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
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
                  onChange={(e) => setName(e.target.value)}
                  required
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-4 py-2 rounded-md dark:bg-neutral-700 dark:text-white border dark:border-gray-600 focus:ring focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
