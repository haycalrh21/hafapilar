import React from "react";
import Link from "next/link";

const departments = [
  {
    title: "Bar",
    image: "/assets/candidate/bartender.png",
    positions:
      "Head Bartender, Bartender, Asst. Bartender, Bar Boy, Bar Waiter",
  },
  {
    title: "Deck",
    image: "/assets/candidate/deck.png",
    positions:
      "AB Sailor, Ordinary Seaman, Fireman, Carpenter, Upholsterer, Waste Operator, Pest Controller",
  },
  {
    title: "Engine",
    image: "/assets/candidate/enginner.png",
    positions: "Plumber, Fitter, Oiler, Wiper",
  },
  {
    title: "Galley",
    image: "/assets/candidate/galley.png",
    positions:
      "CDP, DCDP, Pizza maker, Commis II Baker, Commis II Butcher, Commis II Cook, Food Carver, Asst. Kitchen Steward, Kitchen Utility",
  },
  {
    title: "Hotel",
    image: "/assets/candidate/hotel.png",
    positions:
      "Cabin Steward, Floor Runner, Hotel Cleaner, Pool Attendant, Crew Cleaner, Laundry, Linen keeper",
  },
  {
    title: "Restaurant",
    image: "/assets/candidate/restaurant.png",
    positions:
      "Head Waiter, Waiter, Asst. Waiter, Buffet Attendant, Wine keeper, Asst. Wine keeper, Mess Attendant",
  },
  {
    title: "Spa",
    image: "/assets/candidate/spa.png",
    positions: "Massage Therapist, Nail Specialist",
  },
];

const DepartmentCards = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-[24px] sm:text-[24px] md:text-[24px] lg:text-normal text-center font-['Poppins'] font-bold mt-10 mb-10">
        Select your preferred department
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {departments.map((department, index) => (
          <div
            key={index}
            className="max-w-sm w-full border-hijau border-[1px] bg-white shadow-lg rounded-lg flex flex-col justify-between"
          >
            <img
              className="rounded-t-lg py-4 px-4 object-contain w-full"
              src={department.image}
              alt={department.title}
            />
            <div className="p-4 mb-20 text-left ">
              <h6 className="text-lg font-semibold mb-4">{department.title}</h6>
              <p className="text-[16px] font-medium text-departement">
                Positions: {department.positions}
              </p>
            </div>
            <Link
              href={{
                pathname: "/candidate/form",
                query: { department: department.title },
              }}
            >
              <button className="w-10/12 px-2 py-4 mb-4 mx-auto text-white rounded-2xl shadow-md border-hijau border-[1px] font-['Poppins'] font-semibold text-xs lg:text-sm bg-[#0F4C5C] hover:bg-white hover:text-[#0F4C5C] hover:shadow-amber-400">
                Apply
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCards;
