import React from "react";
import DepartmentCards from "./Card";
import HeaderNotButton from "./HeaderNotButton";

export function CandidatePage() {
  return (
    <div
      className="bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/nexttpage.png')",
        backgroundPosition: "center top",
        backgroundSize: "160% auto",
      }}
    >
      <HeaderNotButton />
      <div className="max-w-6xl mx-auto ">
        <div>
          <h1 className="text-3xl pt-40 font-['Poppins'] font-bold sm:text-2xl sm:font-bold md:text-5xl lg:text-6xl text-center">
            Apply with Us Today
          </h1>

          <p className="text-[14px] font-['Poppins'] mt-4 sm:mb-10 md:mb-20 lg:mb-20 sm:text-sm md:text-base lg:text-2xl text-center">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </div>
    </div>
  );
}
