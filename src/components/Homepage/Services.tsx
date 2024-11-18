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
    <div className="flex flex-col items-center relative overflow-hidden mb-6 mx-4 top-10 sm:top-20 lg:top-0">
      <h2 className="text-2xl md:text-4xl font-bold text-center relative mb-8">
        We Offer{" "}
        <span
          style={{
            backgroundColor: "#F2AF29CC",
            padding: "2px 2px 20px",
            marginRight: "10px",
            display: "inline-block",
            lineHeight: "0.1",
          }}
        >
          Best Services
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border-[#4993a6] border-2 min-h-[300px]"
          >
            <div className="mb-4 flex-grow-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2 flex-grow-0">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 text-center flex-grow">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
