import Link from "next/link";

export default function PartnerCard() {
  return (
    <div>
      <div className="my-10 bg-hijau font-['Poppins'] text-textpartner py-6 rounded-2xl text-center mx-5 border border-hijau">
        <h2 className="text-[24px] sm:text-[24px] lg:text-[36px] font-bold mb-1">
          Work with Us
        </h2>
        <p className="text-sm font-normal sm:[14px] lg:text-[24px] mb-6 px-4">
          Let's work together to build your team
        </p>
        <Link href="/partner">
          <button className="bg-impact text-black px-8 py-3 rounded-2xl font-semibold hover:bg-yellow-400 transition">
            Be Our Partner
          </button>
        </Link>
      </div>
    </div>
  );
}
