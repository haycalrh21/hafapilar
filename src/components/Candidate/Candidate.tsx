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
      className="relative min-h-screen mx-auto"
    >
      {/* Background Vector */}
      <img
        src={"/assets/vectorcandidate.png"}
        className={clsx(
          "absolute z-10", // Tetap di depan elemen latar belakang
          "top-[-3px] left-[28px] w-[358.71px] h-[281.33px] rotate-[-2.2deg]",
          "md:top-[-80px] md:left-[450px] md:w-[673.94px] md:h-[450.56px] md:rotate-[-23.2deg]"
        )}
      />

      {/* Left Side Image */}
      <img
        src="/assets/leftside.png"
        className={clsx(
          "absolute z-0", // Z-index lebih rendah agar berada di belakang DepartmentCards
          "top-[252.4px] left-[-145.01px] w-[363.87px] h-[261.94px]",
          "md:top-[168px] md:left-[-250px] md:w-[715.22px] md:h-[717.55px]"
        )}
      />

      <img
        src="/assets/bottomright.png"
        className={clsx(
          "absolute ", // Z-index lebih rendah agar berada di belakang DepartmentCards
          "top-[3810.4px] left-[60.01px] w-[363.87px] h-[261.94px]",
          "md:top-[1546.53px] md:left-[1200.45px] md:w-[315.22px] md:h-[500.55px]"
        )}
      />

      {/* Content Wrapper */}
      <HeaderNotButton />
      <div className="relative z-20 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl pt-40 font-['Poppins'] text-textlayout font-bold sm:text-2xl sm:font-bold md:text-5xl lg:text-6xl text-center">
            Apply with Us Today
          </h1>

          <p className="text-[14px] font-['Poppins'] text-textlayout mt-4 sm:mb-10 md:mb-20 lg:mb-20 sm:text-sm md:text-base lg:text-2xl text-center">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </div>
    </div>
  );
}
