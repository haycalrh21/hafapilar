"use client";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HeaderHero() {
  const router = useRouter();

  return (
    <div className="relative bg-white">
      {/* Header */}
      <div className="max-w-screen-lg mx-auto flex justify-between items-center flex-wrap p-4">
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
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg border-none cursor-pointer"
          onClick={() => router.push("/candidate")}
        >
          Apply as Candidate
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center my-0 px-4 md:px-20">
        {/* Konten Teks */}
        <div className="z-10 text-center md:text-left p-2 md:p-0 w-full md:w-1/2">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
            color="primary.main"
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            Connecting Potential, Creating Opportunity
          </Typography>
          <Typography
            variant="subtitle1"
            paragraph
            className="mb-4 text-base md:text-lg lg:text-xl"
          >
            Hafa Pilar Indonesia is dedicated to elevating manpower solutions in
            hospitality
          </Typography>
          <Link href="/partner">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="rounded-md px-6 py-2 mb-4"
            >
              Be Our Partner
            </Button>
          </Link>
        </div>

        {/* Gambar */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/assets/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="h-auto max-w-full md:max-w-lg"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
