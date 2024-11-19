"use client";
import React, { useState } from "react";
import {
  Menu,
  Home,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
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
    // {
    //   title: "Settings",
    //   icon: <Settings className="w-5 h-5" />,
    //   href: "/admin/settings",
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-white border-r transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-20"} 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h2 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
            Admin Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 group"
                >
                  {item.icon}
                  <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>Logout</span>
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
        <header className="fixed top-0 right-0 z-20 w-full bg-white border-b">
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
            <div className="flex items-center ml-auto">
              <span className="text-sm font-medium">John Doe</span>
              <img
                src="/assets/team/HaeniUlfa.png"
                alt="Profile"
                className="w-8 h-8 ml-4 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 pt-20">
          <div className="p-8 bg-white rounded-lg shadow">{children}</div>
        </main>
      </div>
    </div>
  );
}
