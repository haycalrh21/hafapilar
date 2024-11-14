import React from "react";
import { Container, Box } from "@mui/material";

import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import ImpactCard from "./impact";
import Testimonial from "./Testimonial";
import TeamCard from "./Team";
import PartnerCard from "./Partner";
import Footer from "./Footer";

export function BlockPage() {
  return (
    <Box
      sx={{ bgcolor: "background.default" }}
      className="min-h-screen bg-cover w-full  mx-auto"
      style={{ backgroundImage: "url('/assets/homepage.png')" }}
    >
      <Header />

      <Container maxWidth="lg">
        <Hero />

        <Services />
        <ImpactCard />

        <Testimonial />

        <TeamCard />
        <PartnerCard />
      </Container>

      <Footer />
    </Box>
  );
}
