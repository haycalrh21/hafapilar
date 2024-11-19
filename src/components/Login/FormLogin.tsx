"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormErrors = {
  email?: string;
  password?: string;
};

export default function FormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Simple form validation
    const errors: FormErrors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });

        setLoading(false);

        if (res?.status === 401) {
          console.log(res);
          alert("Login failed!");
        } else {
          router.push("/admin/dashboard");
          alert("Login success!");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        alert("Login gagal!");
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="p-8 rounded-lg shadow-md w-80 border-hijau border-[1px] bg-white">
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-2 py-4 mt-4 mx-auto text-white rounded-2xl shadow-md border-hijau border-[1px] font-semibold text-xs lg:text-sm bg-[#0F4C5C] hover:bg-white hover:text-[#0F4C5C] hover:shadow-amber-400"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
