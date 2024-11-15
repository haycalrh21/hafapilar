"use client";
import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic"; // Import dynamic for client-side only rendering
import HeaderNotButton from "../HeaderNotButton";

// Dynamically import the FormInput component with ssr: false
const FormInputWithSearchParams = dynamic(() => import("./FormInput"), {
  ssr: false,
});

export default function CandidateForm() {
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
      <HeaderNotButton />
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <div>
          <h1 className="text-center text-3xl font-bold mt-20 sm:text-3xl">
            Apply with Us Today
          </h1>
          <p className="text-center mt-4 mb-20 sm:text-sm">
            Discover the Career of Your Dreams
          </p>
        </div>

        {/* Now render FormInput component which uses useSearchParams */}
        <FormInputWithSearchParams />
      </Container>
    </Box>
  );
}
