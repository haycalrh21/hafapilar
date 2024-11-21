import Image from "next/image";
import Link from "next/link";

export default function HeaderNotButton() {
  return (
    <div className="bg-transparent">
      <header className="w-full ">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center relative">
          <div className="absolute top-4 left-7 sm:right-20 sm:top-3 lg:top-12 lg:-left-12 ">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo Hafa Pilar"
                width={150}
                height={200}
                className="inline-block "
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
