import React from "react";
import HeaderNotButton from "../Candidate/HeaderNotButton";
import FormLogin from "./FormLogin";

export default function LoginPage() {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        backgroundImage: "url('/assets/nexttpage.png')",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <HeaderNotButton />

      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-['Poppins'] pt-40 font-bold sm:text-2xl md:text-5xl lg:text-6xl">
            Login
          </h1>
        </div>
        <div className="mt-4">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
