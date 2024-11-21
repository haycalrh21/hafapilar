import React from "react";
import DepartmentCards from "./Card";
import HeaderNotButton from "./HeaderNotButton";

export function CandidatePage() {
  return (
    <div
      className="bg-background-default bg-[url('/assets/nexttpage.png')] bg-no-repeat min-h-screen"
      style={{
        backgroundPosition: "center top",
        backgroundSize: "100% 100%",
      }}
    >
      <HeaderNotButton />

      <div className="max-w-6xl mx-auto p-0">
        <div>
          <h1 className="text-[24px] pt-40 font-['Poppins'] font-bold sm:text-2xl md:text-5xl lg:text-6xl text-center">
            Apply with Us Today
          </h1>

          <p className="text-xl mt-4 mb-20 sm:mb-10 md:mb-20 lg:mb-20 sm:text-sm md:text-base lg:text-2xl text-center font-['Poppins']">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </div>
    </div>
  );
}
