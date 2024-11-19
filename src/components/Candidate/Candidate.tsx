import React from "react";
import { Container, Box } from "@mui/material";

import DepartmentCards from "./Card";
import HeaderNotButton from "./HeaderNotButton";

export function CandidatePage() {
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
          xs: "280% 1600px ",
          md: "100% 100% ",
        },
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <HeaderNotButton />

      <Container maxWidth="lg" sx={{ p: 0 }}>
        <div>
          <h1 className="text-[24px] pt-40 font-['Poppins'] font-bold sm:text-2xl sm:font-bold md:text-5xl lg:text-6xl text-center  ">
            Apply with Us Today
          </h1>

          <p className=" text-1xl mt-4 mb-20 sm:mb-10 md:mb-20 lg:mb-20 sm:text-sm md:text-base lg:text-2xl text-center  font-['Poppins']  ">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </Container>
    </Box>
  );
}
