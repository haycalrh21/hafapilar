"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      admin panel
      <button onClick={() => signOut()} className="cursor-pointer w-full">
        Logout
      </button>
    </div>
  );
}
