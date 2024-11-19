import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import ImpactCard from "./Impact";
import Testimonial from "./Testimonial";
import TeamCard from "./Team";
import PartnerCard from "./Partner";
import Footer from "./Footer";

export function BlockPage() {
  return (
    <div
      className="bg-cover w-full mx-auto"
      style={{
        backgroundImage: "url('/assets/homepage.png')",
        backgroundColor: "#ECECEC",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <Hero />
        <Services />
        <ImpactCard />
        <Testimonial />
        <TeamCard />
        <PartnerCard />
      </div>
      <Footer />
    </div>
  );
}
