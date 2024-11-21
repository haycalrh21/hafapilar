import Image from "next/image";
import Link from "next/link";

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
            <p className="mt-4 text-[13px] sm:ml-0  lg:ml-1">
              Jl. Bougenvile No.32, Jakarta Utara, Indonesia, 14230
            </p>
          </div>

          {/* Get in Touch */}
          <div className="text-left">
            <h6 className="text-3xl font-bold mb-2">Get in Touch</h6>
            <div className="flex flex-col md:flex-row-3 lg:flex-row gap-3 items-start">
              <Link
                href="mailto:hrd@hafapilar.com"
                className="flex items-center gap-2 text-black no-underline"
              >
                <Image
                  src="/assets/icon/email.png"
                  alt="Email"
                  width={30}
                  height={30}
                />
                <span className="text-[13px] ">hrd@hafapilar.com</span>
              </Link>
              <Link
                href="tel:+62-21-439-24782"
                className="flex items-center gap-2 text-black no-underline"
              >
                <div className="bg-hijau -p-1 rounded-md">
                  {" "}
                  {/* Wrapper div */}
                  <Image
                    src="/assets/icon/wa.png"
                    alt="WhatsApp"
                    className="icon-wa"
                    width={30}
                    height={30}
                  />
                </div>
                <span className="text-[13px] ">+62-21-439-24782</span>
              </Link>
              <Link
                href="https://www.instagram.com/hafapilarindonesia/"
                className="flex items-center gap-2 text-black no-underline"
              >
                <Image
                  src="/assets/icon/ig.png"
                  alt="Instagram"
                  width={30}
                  height={30}
                />
                <span className="text-[13px]">@hafapilarindonesia</span>
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
