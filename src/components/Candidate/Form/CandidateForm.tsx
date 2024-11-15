"use client";
import { Box, Container } from "@mui/material";

import Header from "@/components/Homepage/Header";
import FormInput from "./FormInput";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function CandidateForm() {
  const searchParams = useSearchParams(); // Ambil searchParams
  const department = searchParams.get("department"); // Ambil parameter department dari query string
  if (!department) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        backgroundImage: "url('/assets/nexttpage.png')",
        backgroundPosition: {
          xs: "-400px 0px",
          md: "center top",
          lg: "center top",
        },
        backgroundSize: {
          xs: "280% 1600px",
          md: "100% 100%",
        },
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <div>
          <h1 className="text-center text-3xl font-bold mt-20 sm:text-3xl">
            Apply with Us Today
          </h1>
          <p className="text-center mt-4 mb-20 sm:text-sm">
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
