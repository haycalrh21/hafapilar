import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="py-6 mt-8 max-w-6xl  sm:mx-auto md:mx-auto  lg:mx-auto text-black">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Logo dan Alamat */}
          <div className="text-left">
            <Image
              src="/assets/logo.png"
              alt="Hafa Pilar Logo"
              width={150}
              height={50}
              className="ml-0 lg:ml-1"
            />
            <p className="mt-4 text-[11px] sm:ml-0  text-hero lg:ml-1">
              Jl. Bougenvile No.32, Jakarta Utara, Indonesia, 14230
            </p>
          </div>

          {/* Get in Touch */}
          <div className="text-left">
            <h6 className="text-3xl text-hero font-bold mb-2">Get in Touch</h6>
            <div className="flex flex-col md:flex-row-3 lg:flex-row gap-3 items-start">
              <Link
                href="mailto:hrd@hafapilar.com"
                className="flex items-center gap-2 text-black no-underline"
              >
                <div className="bg-hijau h-8 w-8 flex items-center justify-center rounded-md">
                  {/* Wrapper div */}

                  <MdOutlineEmail className="h-6 w-6 text-white" />
                </div>
                <span className="text-[13px] text-hero">hrd@hafapilar.com</span>
              </Link>
              <Link
                href="tel:+62-21-439-24782"
                className="flex items-center justify-center gap-2 text-black no-underline"
              >
                <div className="bg-hijau h-8 w-8 flex items-center justify-center rounded-md">
                  {/* Wrapper div */}
                  <FaWhatsapp className="h-6 w-6 text-white" />
                </div>
                <span className="text-[13px] text-hero">+62-21-439-24782</span>
              </Link>

              <Link
                href="https://www.instagram.com/hafapilarindonesia/"
                className="flex items-center gap-2 text-black no-underline"
              >
                <div className="bg-hijau h-8 w-8 flex items-center justify-center rounded-md">
                  <FaInstagram className="h-6 w-6 text-white" />
                </div>

                <span className="text-[13px] text-hero">
                  @hafapilarindonesia
                </span>
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t-2 border-hijau" />

        {/* Gambar footer */}
        <div className="flex gap-4 mt-4   sm:justify-start md:justify-center lg:justify-start">
          <Image
            src="/assets/footerbot.png"
            alt="Lloyd's Register"
            width={500}
            height={50}
            className=""
          />
        </div>
      </div>
    </footer>
  );
}
