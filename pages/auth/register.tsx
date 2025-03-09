"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { EyeIcon, EyeSlashIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true); // Open the verification modal
  };
  
  // Check verification code as user types
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setVerificationCode(code);
    
    // Check if code is valid
    if (code === "JAISLAM#25") {
      setIsCodeValid(true);
      setCodeError("");
    } else {
      setIsCodeValid(false);
    }
  };

  const handleVerifyCode = async () => {
    // Check if the code matches the required code
    if (verificationCode === "JAISLAM#25") {
      setCodeError("");
      setShowModal(false);

      // Now proceed with the actual registration
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          // Show success notification
          setShowSuccessNotification(true);

          // Redirect to login page after a short delay
          setTimeout(() => {
            router.push("/auth/login");
          }, 1000);
        } else {
          setError(data.error || "Registration failed. Please try again.");
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setCodeError("Wrong code. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-lg bg-[#17181a] border border-white/30 
                        transition-transform duration-300 hover:scale-[103%] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">

            {/* Name Field */}
            <label className="text-white mb-1 text-md font-poppins">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 bg-[#27292af7] text-white placeholder-gray-300 mb-4 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email Field */}
            <label className="text-white mb-1 text-md font-poppins">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-[#27292af7] text-white placeholder-gray-300 border-2 mb-4 border-white/30 rounded-lg focus:outline-none focus:border-blue-500"
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
                className="w-full p-3 bg-[#27292af7] text-white placeholder-gray-300 border-2 border-white/30 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
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

            {/* Register Button with Right Arrow Icon */}
            <button
              type="submit"
              className="w-full bg-white text-black font-poppins font-semibold py-3 rounded-lg text-lg mt-7 flex items-center justify-center gap-2 transition duration-300 ease-in-out hover:opacity-60"
            >
              Register
              <ChevronRightIcon className="w-4 h-4 stroke-current mt-[2px]" />
            </button>

            {/* Divider Line */}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-5 mb-3 h-[1px] w-full" />

            {/* Already have an account? Login Now */}
            <p className="text-gray-300 text-center mt-4 font-poppins">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:underline">
                Login now
              </Link>
            </p>

          </form>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Verification Code Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#17181a] border border-white/30 rounded-2xl p-8 w-full max-w-md m-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Verification Required</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-300 hover:text-white"
              >
                <XMarkIcon className="w-6 h-6 -mt-4" />
              </button>
            </div>

            <p className="text-gray-300 mb-4">Please enter the verification code to complete your registration.</p>

            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full p-3 my-2 bg-[#27292af7] text-white placeholder-gray-300 rounded-lg border-2 border-white/30 focus:outline-none focus:border-blue-500 pr-12"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
              {/* Tick icon when code is valid */}
              {isCodeValid && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                </div>
              )}
              {codeError && <p className="text-red-500 mt-2">{codeError}</p>}
            </div>

            <button
              onClick={handleVerifyCode}
              className="w-full bg-white text-black font-poppins font-semibold py-3 rounded-lg text-lg transition duration-300 ease-in-out hover:opacity-60"
            >
              Verify & Register
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed m-5 bottom-5 right-0 md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
          Account created sucessfully. Please log in.
        </div>
      )}
    </>
  );
}