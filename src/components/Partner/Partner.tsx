import React from "react";
import { Container, Box } from "@mui/material";
import Header from "../Homepage/Header";
import HeaderNotButton from "../Candidate/HeaderNotButton";
import FormInputPartner from "./FormInput";

export function PartnerPage() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        backgroundImage: "url('/assets/lastpage.png')",
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

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <div>
          <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-6xl text-center font-bold mt-20">
            Become Our Partner
          </h1>
          <p className=" font-sans text-center  mt-4 mb-20 ">
            Build the Dream Team You’ve Always Wanted
          </p>
        </div>
        <FormInputPartner />
      </Container>
    </Box>
  );
}
