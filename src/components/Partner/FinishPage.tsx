import { Box, Container } from "@mui/material";

import Link from "next/link";
import HeaderNotButton from "../Candidate/HeaderNotButton";

export default function FinishPageCandidate() {
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

      <Container maxWidth="lg" sx={{ p: 0, mb: 20 }}>
        <div>
          <h1 className="text-center text-3xl font-bold mt-20 sm:text-3xl">
            Become Our Partner
          </h1>
          <p className="text-center mt-4 mb-20 sm:text-sm">
            Build the Dream Team You’ve Always Wanted
          </p>
        </div>
        <div className="flex flex-col items-center justify-center  mt-20  bg-white rounded-xl">
          <div className="text-center mt-4">
            <p className="font-bold text-3xl">
              Your form has been successfully submitted.
            </p>
            <p>Our team will reach out to you shortly.</p>
          </div>
          <button
            className=" mb-6 text-white px-4 py-2 mt-8 rounded-md w-full max-w-3xl"
            style={{ backgroundColor: "#0F4C5C" }}
          >
            <Link href="/"> Back to Home</Link>
          </button>
        </div>
      </Container>
    </Box>
  );
}
