"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { EyeIcon, EyeSlashIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { RiUserLine, RiUserFollowLine } from "react-icons/ri";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { GoUnlock, GoLock } from "react-icons/go";
import { IoMailOutline, IoMailUnreadOutline } from "react-icons/io5";
import { LuKey } from "react-icons/lu";
import { FaRegFaceFrown, FaRegFaceMeh, FaRegFaceSmile } from "react-icons/fa6";
import { BiMessageAltError } from "react-icons/bi";

export default function Register() {
  const [name, setName] = useState("");
  const [nameValidity, setNameValidity] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false
  }); 
  const router = useRouter();

  // Check name validity whenever name changes
  useEffect(() => {
    if (name.length === 0) {
      setNameValidity("");
    } else if (name.length < 3) {
      setNameValidity("invalid");
    } else {
      setNameValidity("valid");
    }
  }, [name]);

  // Check email validity whenever email changes
  useEffect(() => {
    if (email.length === 0) {
      setEmailValidity("");
    } else {
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setEmailValidity("valid");
      } else {
        setEmailValidity("invalid");
      }
    }
  }, [email]);

  // Check password strength whenever password changes
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10) {
      setPasswordStrength("normal");
    } else {
      // Check for strong password (contains numbers, special chars, uppercase, lowercase)
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      
      if (hasNumber && hasSpecial && hasUppercase && hasLowercase) {
        setPasswordStrength("strong");
      } else {
        setPasswordStrength("normal");
      }
    }
  }, [password]);

  // Get password strength icon
  const getPasswordStrengthIcon = () => {
    switch (passwordStrength) {
      case "weak":
        return <FaRegFaceFrown className="text-red-500" />;
      case "normal":
        return <FaRegFaceMeh className="text-yellow-500" />;
      case "strong":
        return <FaRegFaceSmile className="text-green-500" />;
      default:
        return null;
    }
  };

  // Get color for password strength
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "text-red-500 capitalize";
      case "normal":
        return "text-yellow-500 capitalize";
      case "strong":
        return "text-green-500 capitalize";
      default:
        return "";
    }
  };

  // Get color for name validity
  const getNameValidityColor = () => {
    switch (nameValidity) {
      case "invalid":
        return "text-red-500";
      case "valid":
        return "text-green-500";
      default:
        return "";
    }
  };

  // Get color for email validity
  const getEmailValidityColor = () => {
    switch (emailValidity) {
      case "invalid":
        return "text-red-500";
      case "valid":
        return "text-green-500";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameValidity !== "valid" || emailValidity !== "valid") {
      return; // Prevent submission if validation fails
    }
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
          }, 3000);
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
        <title>Register | Jai Raj&apos;s Nostalgix</title>
      </Head>

      <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-lg bg-[#17181a]/90 border border-white/20
                        transition-all duration-300 hover:scale-[102%] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <h2 className="text-4xl font-bold font-hammersmith text-center 
          mb-5 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent leading-[3rem]">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium font-poppins flex items-center gap-2">Name</label>
              <div className={`relative transition-all duration-200 ${isFocused.name ? 'ring-opacity-0' : ''}`}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {isFocused.name ? <RiUserFollowLine className="w-4 h-4 text-blue-400" /> : <RiUserLine className="w-4 h-4 text-blue-400" />}
                </div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full p-3 pl-10 bg-[#1e2023] text-white placeholder-gray-400 border border-white/10 rounded-lg transition-all duration-200 focus:outline-none ${isFocused.name ? 'rounded-b-none' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => setIsFocused({ ...isFocused, name: false })}
                  required
                />
                {isFocused.name && (
                  <div className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl transition-all duration-300`}></div>
                )}
              </div>
              {/* Only display invalid name message */}
              {nameValidity === "invalid" && (
                <div className="flex items-center">
                  <BiMessageAltError   className={`text-xs font-normal font-poppins ml-1 mt-2 ${getNameValidityColor()}`}/>
                  <span className={`text-xs font-normal font-poppins ml-1 mt-2 ${getNameValidityColor()}`}>
                  Enter a name (min. 3 letters)  </span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium font-poppins flex items-center gap-2">E-mail</label>
              <div className={`relative transition-all duration-200 ${isFocused.email ? 'ring-opacity-0' : ''}`}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {isFocused.email ? <IoMailUnreadOutline className="w-4 h-4 text-blue-400" /> : <IoMailOutline className="w-4 h-4 text-blue-400" />}
                </div>
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  className={`w-full p-3 pl-10 bg-[#1e2023] text-white placeholder-gray-400 border border-white/10 rounded-lg transition-all duration-200 focus:outline-none ${isFocused.email ? 'rounded-b-none' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  required
                />
                {isFocused.email && (
                  <div className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl transition-all duration-300`}></div>
                )}
              </div>
              {/* Only display invalid email message */}
              {emailValidity === "invalid" && (
                <div className="flex items-center">
                <BiMessageAltError   className={`text-xs font-normal font-poppins ml-1 mt-2 ${getEmailValidityColor()}`}/>
                  <span className={`text-xs font-normal font-poppins ml-1 mt-2 ${getEmailValidityColor()}`}>
                    Enter a valid e-mail
                  </span>
                </div>
              )}
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium font-poppins flex items-center gap-2">Password</label>
              <div className={`relative transition-all duration-200 ${isFocused.password ? 'ring-opacity-0' : ''}`}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {isFocused.password ? <GoLock className="w-4 h-4 text-blue-400" /> : <GoUnlock className="w-4 h-4 text-blue-400" />}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full p-3 pl-10 bg-[#1e2023] text-white placeholder-gray-400 border border-white/10 rounded-lg transition-all duration-200 focus:outline-none ${isFocused.password ? 'rounded-b-none outline-0' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  required
                />
                {isFocused.password && (
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
              {/* Password Strength Indicator with Font Awesome Icons */}
              {passwordStrength && (
                <div className="flex items-center mx-1">
                  <div className="mr-2 mt-3">{getPasswordStrengthIcon()}</div>
                  <span className={`text-xs font-semibold font-poppins mt-3 ${getPasswordStrengthColor()}`}>{passwordStrength}</span>
                  {/* Progress bar for visual indication */}
                  <div className="ml-2 h-1 bg-[#242527] rounded-full flex-1 mt-3">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        passwordStrength === "weak" ? "bg-red-500 w-1/3" : 
                        passwordStrength === "normal" ? "bg-yellow-500 w-2/3" : 
                        "bg-green-500 w-full"
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Register Button with Right Arrow Icon */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-poppins font-semibold py-3 rounded-lg text-lg
              flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-indigo-700"
              disabled={nameValidity !== "valid" || emailValidity !== "valid"}
            >  Register
              <ChevronRightIcon className="w-5 h-5 stroke-current" />
            </button>

            {/* Already have an account? Login Now */}
            <p className="text-gray-400 text-center text-sm scale-95 font-poppins">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
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
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <LuKey className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full p-3 pl-10 bg-[#1e2023] text-white placeholder-gray-400 border border-white/10 
               rounded-lg transition-all duration-200 focus:outline-none focus:border-blue-500"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
              {/* Tick icon when code is valid */}
              {isCodeValid && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                </div>
              )}
            </div>

            <button
              onClick={handleVerifyCode}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-poppins font-semibold py-3 rounded-lg text-lg mt-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-indigo-700"
            >  Verify & Register
            </button>
            {codeError && <p className="text-red-500 mt-4 text-center">{codeError}</p>}

          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed m-5 bottom-5 right-0 md:bottom-10 md:right-10 lg:bottom-10 lg:right-10 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]
        text-white px-5 py-3 rounded-lg shadow-lg border border-white/10 flex items-center gap-2">
          <CheckIcon className="w-6 h-6 text-green-500" />
          Account created sucessfully. Please log in.
        </div>
      )}
    </>
  );
}