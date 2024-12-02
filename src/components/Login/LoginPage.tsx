"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { handleLogin } from "../../app/admin/action";
import { Button } from "../ui/button";
import { useUser } from "../context/userContext";
type FormErrors = {
  email?: string;
  password?: string;
};
const LoginPage = () => {
  const { login } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false); // State to control visibility
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Mengirim login request ke server
      await handleLogin(email, password);

      // Simpan email di localStorage melalui context setelah login berhasil
      login(email);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {/* Left side with image - only visible on medium screens and up */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="/assets/loginbg-2.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/assets/vectorlogin1.png"
          alt="Vector 1"
          className="absolute mx-0 inset-0 w-[650px] h-[550px] object-cover"
        />
        <img
          src="/assets/logoadmin.png"
          alt="Logo"
          className="absolute mx-auto inset-0 w-[350px] h-[550px] object-contain"
        />
        <img
          src="/assets/vectorlogin2.png"
          alt="Vector 2"
          className="relative top-[210px] mx-[52px] inset-0 w-[650px] h-[550px] object-contain"
        />
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <p className="text-lg mb-6">Welcome, please login to your account</p>
          <div>
            <img
              src="/logo.png"
              alt="Background"
              className="absolute inset-0 p-10 left-0 w-full h-auto object-cover md:hidden"
            />
          </div>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                id="Email"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="mb-6 relative">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              {/* Input with icon inside */}
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                className="w-full p-2 border rounded-md pr-10" // Add padding to the right for the icon
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Eye icon inside input */}
              <span
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility on click
                className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              className="w-full py-2 bg-hijau text-white rounded-md hover:bg-hero transition duration-200"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
