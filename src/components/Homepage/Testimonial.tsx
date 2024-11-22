"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
    <div className="mx-4 mt-20 md:mx-20 md:pt-10 font-['Poppins']">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        {/* Left Section */}
        <div className="w-full md:w-1/5 lg:w-1/2 text-center md:text-left">
          <h2 className="text-[24px] md:text-[50px] font-bold relative mb-8 text-textlayout">
            <span className="block md:hidden text-textlayout">
              Our{" "}
              <span
                style={{
                  backgroundColor: "#F2AF29CC",
                  font: "Poppins",
                  padding: "2px 2px 20px",
                  marginRight: "1px",
                  display: "inline-block",
                  lineHeight: "0.1",
                }}
                className="text-textlayout"
              >
                Success
              </span>{" "}
              Stories
            </span>
            <span className="hidden md:block">
              Our{" "}
              <span
                style={{
                  backgroundColor: "#F2AF29CC",
                  font: "Poppins",
                  padding: "2px 2px 20px",
                  marginRight: "10px",
                  display: "inline-block",
                  lineHeight: "0.1",
                }}
                className="text-textlayout"
              >
                Success
              </span>{" "}
              Stories
            </span>
          </h2>
          <Link href="/partner">
            <button className="px-8 py-4 text-white rounded-2xl shadow-md border-hijau border-[1px] font-semibold text-xs lg:text-sm bg-hijau hover:bg-white hover:text-[#0F4C5C]">
              Be Our Partner
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full my-4 sm:my-20 md:w-3/5 lg:my-0 relative">
          <div className="relative w-full max-w-xl mx-8">
            <div className="relative space-y-4">
              {/* Card 2 (Background Card) */}
              <Card className="absolute top-14 left-4 bg-cardtesti rounded-2xl p-3 py-4 shadow border border-gray-300 w-[300px] sm:w-1/2 md:1/3 lg:w-full h-[350px]  md:h-[320px] scale-95 z-0">
                <CardContent>
                  <p className="text-texttesti text-[13px] md:text-[17px]">
                    {
                      testimonials[(currentIndex + 1) % testimonials.length]
                        .text
                    }
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col mt-10 justify-center items-start">
                  <p className="text-texttesti  text-[16px] font-bold">
                    {
                      testimonials[(currentIndex + 1) % testimonials.length]
                        .author
                    }
                  </p>
                  <p className="text-departement text-[12px]">
                    {
                      testimonials[(currentIndex + 1) % testimonials.length]
                        .position
                    }
                  </p>
                </CardFooter>
              </Card>

              {/* Card 1 (Front Card) */}
              <Card className="relative bg-white rounded-2xl p-3 py-4 right-8  shadow-lg w-[300px] sm:w-1/2 md:1/3 lg:w-full h-[310px] md:h-[300px] z-30">
                <CardContent>
                  <p className="text-texttesti text-[12px] md:text-[17px] mb-4">
                    {testimonials[currentIndex].text}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col justify-center items-start">
                  <p className="text-texttesti text-[16px] font-bold">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-departement text-[12px]">
                    {testimonials[currentIndex].position}
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-white z-40 rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="absolute right-[40px] md:right-[20px] top-1/2 transform -translate-y-1/2 bg-white z-30 rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
