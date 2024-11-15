import { Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <Box className="flex flex-col md:flex-row justify-between items-center my-14 mx-4">
        {/* Konten Teks */}
        <Box className="z-10 text-center md:text-left p-2 md:p-0 order-2 md:order-1 w-full md:w-1/2">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
            color="primary.main"
          >
            Connecting Potential, Creating Opportunity
          </Typography>
          <Typography variant="subtitle1" paragraph className="mb-4">
            Hafa Pilar Indonesia is dedicated to elevating manpower solutions in
            hospitality
          </Typography>
          <Link href="/partner">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="rounded-s-md px-8 mb-4"
            >
              Be Our Partner
            </Button>
          </Link>
        </Box>

        {/* Gambar */}
        <Box
          component="img"
          src="/assets/hero.png"
          alt="Hero Image"
          className="w-full md:w-1/2 h-[500px] max-w-[600px] order-1 md:order-2 mb-4 md:mb-0  md:absolute md:right-72"
          sx={{ objectFit: "cover" }}
        />
      </Box>
    </div>
  );
}
