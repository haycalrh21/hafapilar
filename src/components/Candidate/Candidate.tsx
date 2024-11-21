import React from "react";
import DepartmentCards from "./Card";
import HeaderNotButton from "./HeaderNotButton";
import { Box, Container } from "@mui/system";

export function CandidatePage() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        backgroundImage: "url('/assets/vectorcandidate.png')",
        backgroundPosition: {
          xs: "200px top", // Mobile: geser ke kiri 500px dari top
          md: "center top",
          lg: "center top",
        },
        backgroundColor: "#ECECEC",
        backgroundSize: {
          xs: "45% 7% ", // Mobile: full width, auto height
          md: "100% 100% ", // Desktop: full width, auto height
          lg: "50% 20% ", // Desktop: full width, auto height
        },
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderNotButton />
      <Container maxWidth="lg" sx={{ p: -20 }}>
        <div>
          <h1 className="text-3xl pt-40  font-['Poppins'] font-bold sm:text-2xl sm:font-bold md:text-5xl lg:text-6xl text-center  ">
            Apply with Us Today
          </h1>

          <p className=" text-[14px]  font-['Poppins'] mt-4  sm:mb-10 md:mb-20 lg:mb-20 sm:text-sm md:text-base lg:text-2xl text-center   ">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </Container>
    </Box>
  );
}
