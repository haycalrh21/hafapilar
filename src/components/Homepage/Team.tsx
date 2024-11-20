import Image from "next/image";

export default function TeamCard() {
  const teamMembers = [
    {
      name: "Hanni Utfa",
      position: "Founder",
      image: "/assets/team/HaeniUlfa.png",
      university: "B.Sc International Business Management, University of Oregon, USA",
    },
    {
      name: "Frian Mandang",
      position: "Co-Founder",
      image: "/assets/team/FrianMardhani.png",
      university: "B.Sc Environmental Studies, University of Oregon, USA",
    },
    {
      name: "Susanna Kina",
      position: "Brand Director",
      image: "/assets/team/SyeanneHioe.png",
      university: "B.Sc Environmental Studies, University of Oregon, USA",
    },
  ];

  return (
    <div className="mx-5 font-['Poppins']">
      <h2 className="text-[24px] sm:text-[24px] lg:text-[50px] font-bold text-center mb-4">
        Meet the Team
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-8">
        We bring a fresh, dynamic approach, uniting global recruitment expertise, deep local market insight, and reliable support to ensure success for international candidates.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 sm:gap-0 lg:gap-20 w-full"> {/* Grid layout */}
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden text-center border-hijau border-[1px]"
          >
            <div className="relative w-full pt-[1%]">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-t-lg py-4 px-4 object-contain w-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-[20px] font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 italic">{member.position}</p>
              <p className="text-[16px] text-gray-600">{member.university}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
