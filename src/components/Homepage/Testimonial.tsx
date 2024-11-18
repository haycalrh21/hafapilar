"use client";
import React, { useState } from "react";
import Link from "next/link";

const testimonials = [
  {
    text: "Thanks to this agency, I was able to land my dream job abroad! They guided me through every step of the process, from preparing my documents to training for interviews. The team was always supportive and made sure I was ready for everything. I'm so grateful and can provide a better future for my family.",
    author: "Mostar F.",
    position: "Cabin Steward in European Cruise",
  },
  {
    text: "This agency truly changed my life. I had always dreamed of working abroad, but didn't know where to start. They not only helped me find a great job in Europe but also supported me with the visa process and even relocation. Their service went beyond my expectations, and now I'm earning more than I ever imagined.",
    author: "Dwi Ayu R.",
    position: "Waitress in Europe",
  },
  {
    text: "The process of working overseas seemed overwhelming, but this agency made it smooth and stress-free. They provided all the information I needed, and their team was very patient in answering my questions. Now, I'm working in a 5-star hotel in Dubai, living a life I never thought was possible. I owe it all to their dedication and hard work.",
    author: "Krisna M.",
    position: "Bartender in Dubai",
  },
  {
    text: "When I first applied, I was nervous about moving abroad, but this agency gave me the confidence I needed. They were with me every step of the way, from the job application to my first day at work in Qatar. The support they provided was exceptional, and now I'm able to support my family back home with a stable income.",
    author: "Bayu P.",
    position: "Laundry Steward in Hotel Qatar",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="mx-4 md:mx-20 md:pt-20">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        {/* Left Section */}
        <div className="w-full md:w-1/5 lg:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {/* Teks satu baris di mobile */}
            <span className="block md:hidden">
              Our{" "}
              <span className="inline-block bg-[#F2AF29CC] px-1 pb-1 md:pb-5 leading-3">
                Success
              </span>{" "}
              Stories
            </span>
            {/* Teks dua baris di laptop */}
            <span className="hidden md:block">
              <span>
                Our{" "}
                <span className="inline-block bg-[#F2AF29CC] px-1 pb-1 md:pb-5 leading-3">
                  Success
                </span>
              </span>
              <br />
              <span>Stories</span>
            </span>
          </h2>
          <Link href="/partner">
            <button className="px-8 py-4 text-white rounded-2xl shadow-md border-teal-600 border-2 font-semibold text-xs lg:text-sm bg-[#0F4C5C] hover:bg-white hover:text-[#0F4C5C] hover:shadow-amber-400">
              Be Our Partner
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full my-20 sm:my-20 md:w-2/3 lg:my-0 relative ">
          <div className="relative w-full max-w-xl mx-auto">
            {/* Card Container */}
            <div className="relative h-[400px] md:h-[500px]">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8  z-20 w-[85%] absolute left-0 top-0 border-[#4993a6] border-2">
                <p className="mb-4 font-normal text-sm md:text-base">
                  {testimonials[currentIndex].text}
                </p>
                <p className="text-gray-600 font-normal">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-gray-600 font-normal text-sm">
                  {testimonials[currentIndex].position}
                </p>
              </div>

              {/* Background Card */}
              <div className="absolute z-10 w-[85%] right-0 top-[25%] h-[80%]  sm:h-[50%] md:h-[70%] lg:h-[45%] xl:h-[45%] rounded-2xl bg-[#0F4C5C80] opacity-60 shadow-xl border-[#4993a6] border-2">
                <div className="p-6 font-thin h-full flex flex-col justify-between">
                  <div className="text-white mb-4 line-clamp-[8] text-sm">
                    {
                      testimonials[(currentIndex + 1) % testimonials.length]
                        .text
                    }
                  </div>
                  <div className="mt-auto">
                    <div className="text-white font-normal">
                      {
                        testimonials[(currentIndex + 1) % testimonials.length]
                          .author
                      }
                    </div>
                    <div className="text-white font-thin text-sm mt-1">
                      {
                        testimonials[(currentIndex + 1) % testimonials.length]
                          .position
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-[-20px] top-[30%] -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-30 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-[-20px] top-[55%] -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-30 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
