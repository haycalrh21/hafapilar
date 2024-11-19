import Image from "next/image";

export default function TeamCard() {
  const teamMembers = [
    {
      name: "Hanni Utfa",
      position: "Founder",
      image: "/assets/team/HaeniUlfa.png",
      university: "B.Sc Environmental Studies, University of Oregon, USA",
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
    <div className=" mx-5 font-['Poppins']">
      <h2 className="text-[24px] sm:text-[24px] lg:text-[50px] font-bold font-['Poppins'] text-center mb-4">
        Meet the Team
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-8">
        We bring a fresh, dynamic approach, uniting global recruitment
        expertise, deep local market insight, and reliable support to ensure
        success for international candidates.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-full sm:w-[250px] bg-white rounded-lg shadow-md overflow-hidden text-center  border-hijau border-[1px]"
          >
            <div className="relative w-full pt-[1%]">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-t-lg py-4 px-4 object-contain w-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.position}</p>
              <p className="text-sm text-gray-600">{member.university}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
