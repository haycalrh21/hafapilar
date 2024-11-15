import Image from "next/image";
import Link from "next/link";

export default function HeaderNotButton() {
  return (
    <div className="bg-transparent">
      <header className="w-full py-4">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center relative">
          <div className="absolute top-4 sm:left-2 lg:top-9">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Logo Hafa Pilar"
                width={120}
                height={40}
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
