// pages\auth\login.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/solid";
import { GoUnlock, GoLock } from "react-icons/go";
import { IoMailOutline, IoMailUnreadOutline } from "react-icons/io5";
import { RiSpam2Line } from "react-icons/ri";
import { useCallback } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

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

      // Store the full user object, including the role
      localStorage.setItem("user", JSON.stringify(data.user));

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
      localStorage.setItem("sessionExpireAt", expireTime.toString());

      // Navigate to /community
      router.push("/community");
    }
    else {
      setError(data.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-lg bg-[#17181a]/90 border border-white/20
                        transition-all duration-300 hover:scale-[102%] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <h2 className="text-4xl font-bold font-hammersmith text-center 
          mb-5 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent leading-[3rem]">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium font-poppins flex items-center gap-2">
                E-mail
              </label>
              <div className={`relative transition-all duration-200 ${isFocused.email ? 'ring-opacity-0 ' : ''}`}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {isFocused.email ? < IoMailUnreadOutline className="w-4 h-4 text-blue-400" /> : <IoMailOutline className="w-4 h-4 text-blue-400" />}

                </div>
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  className={`w-full p-3 pl-10 bg-[#1e2023] text-white placeholder-gray-400 border border-white/10 
    rounded-lg transition-all duration-200 focus:outline-none ${isFocused.email ? 'rounded-b-none' : ''
                    }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  required
                />

                <div className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-indigo-500  rounded-b-xl transition-all duration-300 ${isFocused.email ? 'opacity-100' : 'opacity-0'}`}></div></div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium font-poppins flex items-center gap-2">
                Password
              </label>
              <div className={`relative transition-all duration-200 ${isFocused.password ? 'ring-opacity-0' : ''}`}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {isFocused.password ? <GoLock className="w-4 h-4 text-blue-400" /> : <GoUnlock className="w-4 h-4 text-blue-400" />}

                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full p-3 pl-10 bg-[#1e2023] text-white placeholder-gray-400 border border-white/10 
    rounded-lg transition-all duration-200 focus:outline-none ${isFocused.password ? 'rounded-b-none outline-0' : ''
                    }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  required
                />

                {isFocused.password && (  // Conditionally render the gradient line
                  <div className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl transition-all duration-300`}></div>
                )}
                {/* Eye Icon for Password Visibility */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-white/25 hover:opacity-75 transition-colors duration-200 " />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-white/25 hover:opacity-75 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div
              className="flex items-center cursor-pointer group mt-2"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                className={`w-5 h-5 flex items-center scale-90 justify-center rounded-md transition-all duration-200 ${rememberMe
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-transparent"
                  : "border-2 border-white/30"
                  }`}
              >
                {rememberMe && <CheckIcon className="p-1 text-white" />}
              </div>
              <label className="text-gray-300 text-sm ml-2 font-poppins cursor-pointer group-hover:opacity-75 transition-colors duration-200">
                Remember this device
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-poppins font-semibold py-3 rounded-lg text-lg mt-6 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-indigo-700"
            >
              Login
              <ChevronRightIcon className="w-5 h-5 stroke-current" />
            </button>

            {/* Register Link */}
            <p className="text-gray-400 text-center text-sm scale-95 font-poppins">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
                Register now
              </Link>
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Floating Session Expired Message */}
      {sessionExpired && (
        <div className="fixed m-5 bottom-5 right-0 md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]
        text-white px-5 py-3 rounded-lg shadow-lg border border-white/10 flex items-center gap-2">
          <RiSpam2Line className="w-6 h-6 text-red-500" />
          Session time expired.
        </div>
      )}
    </>
  );
}