"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="bg-transparent py-2">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" passHref>
          <Image
            src="/assets/logo.png"
            alt="Hafa Pilar Logo"
            width={150}
            height={50}
            className="inline-block"
          />
        </Link>
        <button
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg border-none ml-5 mt-2 sm:mt-0 cursor-pointer"
          onClick={() => {
            router.push("/candidate");
          }}
        >
          Apply as Candidate
        </button>
      </div>
    </div>
  );
}
