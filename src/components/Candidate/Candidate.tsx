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
          <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-6xl text-center font-bold mt-20">
            Apply with Us Today
          </h1>

          <p className=" font-extralight text-center  mt-4 mb-20 sm:text-sm">
            Discover the Career of Your Dreams
          </p>
        </div>
        <DepartmentCards />
      </Container>
    </Box>
  );
}
