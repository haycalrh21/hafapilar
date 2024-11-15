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
      <h5 className="text-xl font-bold mb-4">
        Select your preferred department
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {departments.map((department, index) => (
          <div
            key={index}
            className="max-w-sm w-full bg-white shadow-lg rounded-lg flex flex-col justify-between"
          >
            <img
              className="rounded-t-lg h-48 object-cover w-full"
              src={department.image}
              alt={department.title}
            />
            <div className="p-4">
              <h6 className="text-lg font-semibold">{department.title}</h6>
              <p className="text-sm text-gray-600">
                Positions: {department.positions}
              </p>
            </div>
            <Link
              href={{
                pathname: "/candidate/form",
                query: { department: department.title },
              }}
            >
              <button className="w-11/12 mx-auto bg-[#0F4C5C] text-white py-2 rounded-md font-bold mb-4">
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
