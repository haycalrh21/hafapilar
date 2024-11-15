import React from "react";
import { Container, Box } from "@mui/material";
import Header from "../Homepage/Header";
import DepartmentCards from "./Card";
import HeaderNotButton from "./HeaderNotButton";

export function CandidatePage() {
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
        minHeight: "100vh",
      }}
    >
      <HeaderNotButton />

      <Container maxWidth="lg" sx={{ p: 0 }}>
        <div>
          <h1 className="text-center text-3xl font-bold mt-20 sm:text-3xl">
            Apply with Us Today
          </h1>
          <p className="text-center mt-4 mb-20 sm:text-sm">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </Container>
    </Box>
  );
}
