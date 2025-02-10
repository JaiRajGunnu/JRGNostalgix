"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head"; // ✅ Import Head for setting page title
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/auth/login"); // Redirect to login page
    } else {
      setError(data.error || "Registration failed. Please try again.");
    }
  };

  return (
    <>
      {/* ✅ Set Page Title */}
      <Head>
        <title>Register</title>
      </Head>

      <BackgroundBeamsWithCollision className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/30 
                        transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            
            {/* Name Field */}
            <label className="text-white mb-1 text-lg">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email Field */}
            <label className="text-white mb-1 text-lg">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field */}
            <label className="text-white mb-1 text-lg">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg text-lg mt-10 mb-4 transition duration-300 ease-in-out hover:from-blue-500 hover:to-purple-500"
            >
              Register
            </button>

            {/* Divider Line */}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-5 mb-3 h-[1px] w-full" />

            {/* Already have an account? Login Now */}
            <p className="text-gray-300 text-center mt-4">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:underline">
                Login now
              </Link>
            </p>

            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          </form>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
}
