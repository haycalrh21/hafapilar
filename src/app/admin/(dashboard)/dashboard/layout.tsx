"use client";
import React, { useEffect, useState } from "react";
import {
  Menu,
  Home,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Handshake,
} from "lucide-react";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FaRegBell } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { handleLogout } from "../../action";
import { useUser } from "@/components/context/userContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { email, login, logout } = useUser();

  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      // Mengirim login request ke server
      await handleLogout();

      // Simpan email di localStorage melalui context setelah login berhasil
      logout();
    } catch (error) {}
  };
  const processedParam = pathname.split("/").filter(Boolean).pop();

  // Generate a display name based on the parameter
  const displayParam = processedParam
    ? `${processedParam} list`.replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
    : "Dashboard";
  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Candidate",
      icon: <Users className="w-5 h-5" />,
      href: "/admin/dashboard/candidate",
    },
    {
      title: "Partner",
      icon: <Handshake className="w-5 h-5" />,
      href: "/admin/dashboard/partner",
    },
    {
      title: "Admin",
      icon: <RiAdminLine className="w-5 h-5" />,
      href: "/admin/dashboard/admin",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-lg border-r transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-20"} 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4  ">
          <img src="/assets/logo.png" alt="Logo" className="h-10 w-40" />
          {/* <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button> */}
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 text-gray-700 rounded-lg group ${
                    pathname === item.href
                      ? "bg-[#0F4C5C]/20"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className={`ml-4 ${!isSidebarOpen && "hidden"}`}>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 ">
          <button
            onClick={() => handleSubmit()}
            className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span className={`ml-3 ${!isSidebarOpen && "hidden"} text-red-500`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="fixed top-0 right-0 z-20 w-full bg-white shadow-sm">
          <div
            className={`flex items-center justify-between h-16 px-4 ${
              isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
            } transition-all duration-300`}
          >
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <p className="text-lg font-semibold">{displayParam}</p>
            <div className="flex items-center ml-auto justify-between">
              <FaRegBell
                className="w-8 h-8 bg-[#F7F7F7] rounded-lg border-[1px] p-1 mr-4 cursor-pointer"
                strokeWidth={-10}
              />
              <div className="flex items-center rounded-2xl bg-[#F7F7F7] border-[1px] p-1">
                <img
                  src="/assets/team/HaeniUlfa.png"
                  alt="Profile"
                  className="w-8 h-8 mr-2 rounded-full"
                />
                <span className="text-sm font-medium">{email}</span>

                <FiChevronRight className="w-6 h-6 " strokeWidth={-100} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 pt-20">
          <div className="  ">{children}</div>
        </main>
      </div>
    </div>
  );
}
