import Link from "next/link";

export default function PartnerCard() {
  return (
    <div>
      <div className="my-20 bg-hijau font-['Poppins'] text-white py-6 rounded-lg text-center mx-5 border border-hijau">
        <h2 className="text-3xl font-bold mb-4">Work with Us</h2>
        <p className="mb-6">Let's work together to build your team</p>
        <Link href="/partner">
          <button className="bg-[#F2AF29] text-black px-8 py-3 rounded-md font-bold hover:bg-yellow-400 transition">
            Be Our Partner
          </button>
        </Link>
      </div>
    </div>
  );
}
