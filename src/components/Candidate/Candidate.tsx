import React from "react";
import DepartmentCards from "./Card";
import HeaderNotButton from "./HeaderNotButton";
import clsx from "clsx";

export function CandidatePage() {
  return (
    <div
      style={{
        backgroundColor: "#ECECEC",
        backgroundPosition: "center top",
      }}
      className="relative overflow-hidden min-h-screen" // Nambahin overflow-hidden disini
    >
      {/* Background Vector */}
      <img
        src={"/assets/vectorcandidate.png"}
        className={clsx(
          "absolute z-10",
          "top-[-3px] left-[-18px] w-[358.71px] h-[281.33px] rotate-[-2.2deg]",
          "md:top-[-80px] md:left-[450px] md:w-[673.94px] md:h-[450.56px] md:rotate-[-23.2deg]"
        )}
      />

      {/* Left Side Image */}
      <img
        src="/assets/leftside.png"
        className={clsx(
          "absolute z-0",
          "top-[252.4px] left-[-145.01px] w-[363.87px] h-[261.94px]",
          "md:top-[168px] md:left-[-250px] md:w-[715.22px] md:h-[717.55px]"
        )}
      />

      {/* Bottom Right Image */}
      <img
        src="/assets/bottomright.png"
        className={clsx(
          "absolute",
          "bottom-0 right-[-100px] w-[363.87px] h-[261.94px]", // Ubah positioning ke bottom
          "md:bottom-0 md:right-[-100px] md:w-[315.22px] md:h-[500.55px]"
        )}
      />

      {/* Content Wrapper */}
      <HeaderNotButton />
      <div className="relative z-20 max-w-6xl mx-auto">
        <div>
          <h1 className="text-[24px] pt-40 font-['Poppins'] text-textlayout font-bold sm:text-2xl sm:font-bold md:text-5xl lg:text-6xl text-center">
            Apply with Us Today
          </h1>

          <p className="text-[11px] font-['Poppins'] text-textlayout mt-1 md:mt-4 sm:mb-10 md:mb-20 lg:mb-20 md:text-base lg:text-2xl text-center">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </div>
    </div>
  );
}
