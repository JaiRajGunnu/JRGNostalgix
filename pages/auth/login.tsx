// pages\auth\login.tsx

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/solid";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useCallback } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // For showing "Session time expired." floating message
  const [sessionExpired, setSessionExpired] = useState(false);

  const router = useRouter();

  // Helper: logs out user, shows floating message
  const logoutAndShowExpiration = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpireAt");
    setSessionExpired(true);

    // Optionally redirect to /login (if user isn't already here)
    router.replace("/");

    // Hide message after 3 seconds
    setTimeout(() => setSessionExpired(false), 3000);
  }, [router]);

  // 1) Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If a token exists, verify session isn't expired
      const expireAt = localStorage.getItem("sessionExpireAt");
      if (expireAt && Date.now() >= parseInt(expireAt)) {
        // Session already expired
        logoutAndShowExpiration();
      } else {
        // Session is still valid, redirect to /community
        router.replace("/community");
      }
    }
  }, [logoutAndShowExpiration, router]);

  // 2) Set up an interval to check for session expiry every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const expireAt = localStorage.getItem("sessionExpireAt");

      if (token && expireAt && Date.now() >= parseInt(expireAt)) {
        // Session is expired
        logoutAndShowExpiration();
      }
    }, 30_000); // check every 30s

    return () => clearInterval(interval);
  }, [logoutAndShowExpiration]);

  // 3) Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token && data.user) {
      // Store token
      localStorage.setItem("token", data.token);

      // (A) Store userName if needed
      localStorage.setItem("userName", data.user.name || "Guest");

      // (B) If user wants "remember me," store that logic
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // (C) Set session expire time (15 minutes in milliseconds from now)
      const expireTime = Date.now() + 15 * 60 * 1000;
      
      // For testing: expires in 30 seconds
      // const expireTime = Date.now() + 30 * 1000;


      localStorage.setItem("sessionExpireAt", expireTime.toString());

      // Navigate to /community
      router.push("/community");
    } else {
      setError(data.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-lg bg-[#17181a] border border-white/30 
                        transition-transform duration-300 hover:scale-[103%] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <h2 className="text-4xl font-bold font-hammersmith text-center text-white mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col">
            {/* Email Field */}
            <label className="text-white mb-1 text-md font-poppins">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-[#27292af7] text-white placeholder-gray-300 border border-white/30 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field with Eye Toggle */}
            <label className="text-white mb-1 text-md font-poppins">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 bg-[#27292af7] text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Eye Icon for Password Visibility */}
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-6 h-6 text-gray-300" />
                ) : (
                  <EyeIcon className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </div>

            {/* Remember Me Checkbox using CheckIcon */}
            <div
              className="flex items-center mt-5 cursor-pointer"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                className={`w-4 h-4 flex items-center justify-center border-2 rounded ${rememberMe ? "bg-blue-500 border-blue-500" : "border-white/50"
                  }`}
              >
                {rememberMe && <CheckIcon className="w-4 h-4 text-white" />}
              </div>
              <label className="text-gray-300 text-sm ml-2  font-poppins cursor-pointer">
                Remember this device?
              </label>
            </div>

            {/* Divider Line */}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-5 mb-3 h-[1px] w-full" />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-white text-black font-poppins font-semibold py-3 rounded-lg text-lg mt-7 flex items-center justify-center gap-2 transition duration-300 ease-in-out hover:opacity-60"
            >
              Login
              <ChevronRightIcon className="w-4 h-4 stroke-current mt-[2px]" />
            </button>
            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          </form>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Floating Session Expired Message */}
      {sessionExpired && (
        <div className="fixed m-5 bottom-5 right-0  md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
          Session time expired.
        </div>
      )}
    </>
  );
}



