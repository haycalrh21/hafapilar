import Image from "next/image";
import Link from "next/link";

export default function HeaderNotButton() {
  return (
    <div className="bg-transparent">
      <header className="w-full ">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center relative">
          {/* <div className="absolute top-4 left-7 sm:right-20 sm:top-3 lg:top-12 lg:-left-12 "> */}
          {/* <div className="absolute top-4 left-7 sm:right-20 sm:top-3 lg:top-12 lg:-left-12 "> */}
          <div className="absolute h-4 w-32 top-10 left-7  sm:w-10 md:w-20  sm:right-10 lg:w-40  sm:top-20 md:top-20 lg:-left-12 lg:top-12">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Logo Hafa Pilar"
                className="inline-block "
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
