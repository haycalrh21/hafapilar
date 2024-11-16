"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="bg-transparent py-2">
      <div className="mx-auto flex justify-between items-center flex-wrap w-full">
        {" "}
        {/* Menggunakan w-full untuk memastikan container bisa lebih lebar */}
        <Link href="/" passHref>
          <div className="relative w-full h-48">
            {" "}
            {/* Set height sesuai kebutuhan */}
            <Image
              src="/logo.png"
              alt="Hafa Pilar Logo"
              fill
              className="object-contain"
            />
          </div>
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
