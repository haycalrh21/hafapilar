"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  // Mengambil email dari localStorage saat aplikasi dimulai
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail); // Set email jika ada di localStorage
    }
  }, []);

  const login = (email: string) => {
    setEmail(email);
    localStorage.setItem("email", email); // Simpan email ke localStorage
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("email"); // Hapus email dari localStorage
  };

  return (
    <UserContext.Provider value={{ email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
