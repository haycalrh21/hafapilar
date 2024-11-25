import Link from "next/link";
import HeaderNotButton from "../HeaderNotButton";
import clsx from "clsx";

export default function FinishPage() {
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
          "md:top-[8px] md:left-[-40px] md:w-[500.22px] md:h-[677.55px]  md:rotate-[-2.2deg]"
        )}
      />

      {/* Bottom Right Image */}
      <img
        src="/assets/bottomright.png"
        className={clsx(
          "absolute",
          "bottom-0 right-[-100px] w-[363.87px] h-[261.94px]", // Ubah positioning ke bottom
          "md:-bottom-10 md:right-[-10px] md:w-[315.22px] md:h-[500.55px] md:rotate-[-7.25deg]"
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
        <div className="flex flex-col items-center justify-center  mt-20  bg-white rounded-xl">
          <div className="text-center mt-4">
            <p className="font-bold text-[20px] md:text-[24px]">
              Your form has been successfully submitted.
            </p>
            <p className="text-[14px] text-testi2 ">
              Our team will reach out to you shortly.
            </p>
          </div>
          <Link href="/" className="text-white px-4  mt-8 rounded-md w-full ">
            <button className=" mb-6 text-white px-4 py-2 rounded-md w-full bg-hijau hover:bg-cardtesti ">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
