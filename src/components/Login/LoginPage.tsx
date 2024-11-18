import React from "react";
import { Container, Box } from "@mui/material";
import HeaderNotButton from "../Candidate/HeaderNotButton";
import FormLogin from "./FormLogin";

export default function LoginPage() {
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
          <h1 className="text-3xl pt-40 font-bold sm:text-2xl sm:font-bold md:text-5xl lg:text-6xl text-center  ">
            Login
          </h1>
        </div>
        <FormLogin />
      </Container>
    </Box>
  );
}
