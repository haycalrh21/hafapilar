import React from "react";

const services = [
  {
    image: "/assets/services/talent.png",
    title: "Talent Acquisition & Recruitment",
    description:
      "We specialize in sourcing and recruiting top talent to drive your business forward",
  },
  {
    image: "/assets/services/training.png",
    title: "Training Center Facility & Language Courses",
    description:
      "Investing in your team is essential. We provide a fully equipped training center and diverse language courses to enhance professional skills and communication",
  },
  {
    image: "/assets/services/employee.png",
    title: "Employee Onboarding & Management",
    description:
      "We handle all aspects of manpower onboarding, from contract signing and orientation to government registrations, visa processing, background checks, and medical clearances",
  },
];

export default function Services() {
  return (
    <div className="flex flex-col items-center relative overflow-hidden -mb-20 sm:-mb-20 lg:mb-6 mx-4 top-0 sm:top-20 lg:top-0 font-['Poppins']">
      <h2 className="text-[18px] text-texttesti sm:text-[24px]  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-6 sm:mb-3 lg:mb-20">
        <span className="block md:hidden text-textlayout">
          We
          <span className="mt-2"> Offer</span>{" "}
          <p
            style={{
              backgroundColor: "#F2AF29CC",
              font: "Poppins",
              padding: "2px 2px 10px",
              marginRight: "10px",
              display: "inline-block",
              lineHeight: "0.1",
            }}
            className="text-textlayout"
          >
            Best Services
          </p>
        </span>
        <span className="hidden md:block">
          We
          <span className="mt-2">Offer</span>{" "}
          <p
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
            Best Services
          </p>
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20 sm:mb-4 lg:mb-20 gap-5 sm:-gap-10 lg:gap-20 w-full">
        {" "}
        {/* Grid layout */}
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-[20px] p-7 py-10 flex flex-col items-center border-hijau border-[1px] min-h-[200px]"
          >
            <div className="mb-4 flex-grow-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-10 sm:w-20 sm:h-10 md:w-40 md:h-40 lg:w-20 lg:h-20 object-contain"
              />
            </div>
            <h3 className="text-[13px] sm:text-[13px] lg:text-[20px] text-textlayout font-semibold text-center mb-2 ">
              {service.title}
            </h3>
            <p className="text-[11px] sm:text-[13px] lg:text-[16px]  text-gray-600 text-center ">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
