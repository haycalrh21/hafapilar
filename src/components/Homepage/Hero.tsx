"use client";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen lg:h-auto flex flex-col items-center  lg:flex-row-reverse lg:justify-center">
      {/* Gambar - Di kanan pada desktop, atas pada mobile */}
      <div className="lg:w-1/2 w-full h-1/2 lg:h-full relative mb-4 lg:mb-0">
        <Image
          src="/assets/hero.png"
          alt="Hero Image"
          layout="responsive"
          width={600}
          height={300}
          className="object-fill w-1/2 h-full"
          priority
        />
      </div>

      <div className="w-full sm:top-20  lg:w-1/2 px-4 py-2 lg:px-8 flex flex-col items-center lg:items-start text-center lg:text-left ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-2">
          Connecting Potential, <br /> Creating Opportunity
        </h1>
        <p className="text-sm font-thin md:text-base lg:text-lg text-black mb-4 max-w-md lg:max-w-lg">
          Hafa Pilar Indonesia is dedicated to elevating manpower solutions in
          hospitality
        </p>
        <Link href="/partner">
          <button className="px-4 py-4 text-white rounded-lg shadow-md border-teal-600 border-2 font-semibold text-xs lg:text-sm bg-[#0F4C5C] hover:bg-white hover:text-[#0F4C5C] transition-colors duration-200">
            Be Our Partner
          </button>
        </Link>
      </div>

      <div className="absolute top-4 right-4 lg:right-12 lg:top-12">
        <Link href="/candidate">
          <button className="px-4 py-2 text-teal-600 rounded-lg shadow-md bg-white border-teal-600 border-2 font-semibold text-xs lg:text-sm hover:bg-[#0F4C5C] hover:text-white">
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
            className="inline-block left-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
