"use client";
import { Box, Container } from "@mui/material";

import FormInput from "./FormInput";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import HeaderNotButton from "../HeaderNotButton";

export default function CandidateForm() {
  const searchParams = useSearchParams();
  const department = searchParams.get("department");
  if (!department) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        backgroundImage: "url('/assets/nexttpage.png')",
        backgroundPosition: {
          xs: "-400px 0px", // Mobile: geser ke kiri 500px dari top
          md: "center top",
          lg: "center top",
        },
        backgroundSize: {
          xs: "280% 1600px ", // Mobile: full width, auto height
          md: "100% 100% ", // Desktop: full width, auto height
        },
        backgroundRepeat: "no-repeat",
        minHeight: "200vh",
      }}
    >
      <HeaderNotButton />
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <div>
          <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-6xl text-center font-bold mt-20">
            Apply with Us Today
          </h1>

          <p className=" font-sans text-center  mt-4 mb-20 ">
            Discover the Career of Your Dreams
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <FormInput department={department} />
        </Suspense>
      </Container>
    </Box>
  );
}
