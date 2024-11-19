"use client";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative font-['Poppins'] w-full h-auto flex flex-col items-center md:flex-col lg:flex-row-reverse lg:justify-center">
      {/* Gambar - Di kanan pada desktop, atas pada mobile dan iPad */}
      <div className="w-full md:w-3/4 lg:w-1/2 h-auto relative">
        <Image
          src="/assets/hero.png"
          alt="Hero Image"
          layout="responsive"
          width={600}
          height={300}
          className="object-contain w-full h-auto"
          priority
        />
      </div>

      {/* Teks - Di bawah gambar pada mobile dan iPad, di kiri pada desktop */}
      <div className="w-full lg:w-1/2 px-4 mt-[-4rem ]  md:mt-[-8rem] lg:mt-0 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-[24px] font-bold md:text-[36px] lg:text-[48px] xl:text-[48px] text-hero mb-2 leading-tight lg:leading-[70px]  ">
          Connecting Potential,
          <br />
          Creating Opportunity
        </h1>

        <span className="text-[16px] text-black mt-2 max-w-md md:max-w-xl lg:max-w-lg lg:leading-[25px] ">
          Hafa Pilar Indonesia is dedicated to elevating manpower solutions in
          hospitality. With over 30 years of expertise we take pride in building
          a business founded on excellence and a proven global recruitment
          strategy
        </span>

        <Link href="/partner">
          <button className="px-4 py-3 mt-4 text-[14px] sm:text-[12px] lg:text-[18px] font-['Poppins'] text-white rounded-lg shadow-md border-hijau border-[1px]    bg-[#0F4C5C] hover:bg-white hover:text-[#0F4C5C] transition-colors duration-200">
            Be Our Partner
          </button>
        </Link>
      </div>

      {/* Tombol Apply - Di kanan atas */}
      <div className="absolute top-6 right-4  lg:right-12 lg:top-12">
        <Link href="/candidate" className="">
          <button className="px-4 py-2 text-[12px]   sm:text-[12px] md:text-[12px] lg:text-[20px] text-hijau rounded-lg shadow-md bg-white border-[1px] border-hijau font-semibold font-['Poppins']  text-xs lg:text-sm hover:bg-[#0F4C5C] hover:text-white">
            Apply as a Candidate
          </button>
        </Link>
      </div>

      {/* Logo - Pojok Kiri Atas */}
      <div className="absolute top-4 left-4 lg:left-12 lg:top-12">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Hafa Pilar"
            width={150}
            height={200}
            className="inline-block"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
