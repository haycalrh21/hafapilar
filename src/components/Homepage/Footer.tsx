import { Box, Container, Typography, Link, Stack } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, mt: 8, color: "black" }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }} // Vertikal di mobile, horizontal di desktop
          justifyContent="space-between"
          alignItems="flex-start" // Agar semua elemen rata kiri
          spacing={4}
        >
          {/* Logo dan Alamat */}
          <Box sx={{ textAlign: { xs: "left", md: "left" } }}>
            <Image
              src="/assets/logo.png"
              alt="Hafa Pilar Logo"
              width={150}
              className="ml-0"
              height={50}
            />
            <Typography
              variant="body2"
              paragraph
              sx={{ mt: 2 }}
              className="sm:ml-8 lg:ml-4"
            >
              Jl. Bougenvile No.32, Jakarta Utara, Indonesia, 14230
            </Typography>
          </Box>

          {/* Get in Touch */}
          <Box sx={{ textAlign: { xs: "left", md: "left" } }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Get in Touch
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }} // Vertikal di mobile, horizontal di desktop
              spacing={3}
              alignItems="flex-start" // Pastikan elemen "Get in Touch" rata kiri di mobile
            >
              <Link
                href="mailto:hrd@hafapilar.com"
                color="inherit"
                underline="none"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image
                    src="/assets/icon/email.png"
                    alt="Email"
                    width={30}
                    height={30}
                  />
                  <Typography variant="body2">hrd@hafapilar.com</Typography>
                </Stack>
              </Link>
              <Link
                href="tel:+62-21-439-24782"
                color="inherit"
                underline="none"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image
                    src="/assets/icon/call.png"
                    alt="Phone"
                    width={30}
                    height={30}
                  />
                  <Typography variant="body2">+62-21-439-24782</Typography>
                </Stack>
              </Link>
              <Link
                href="https://www.instagram.com/hafapilarindonesia/"
                color="inherit"
                underline="none"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image
                    src="/assets/icon/ig.png"
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                  <Typography variant="body2">instagram</Typography>
                </Stack>
              </Link>
            </Stack>
          </Box>
        </Stack>
        <hr className="my-4 " style={{ borderColor: "#0F4C5C" }} />
        {/* Gambar footer */}
        <Box
          display="flex"
          gap={2}
          mt={4}
          justifyContent="flex-start" // Pastikan gambar footer rata kiri di mobile
        >
          <Image
            src="/assets/footerbot.png"
            alt="Lloyd's Register"
            width={500}
            height={50}
            className="sm:ml-auto lg:ml-3"
          />
        </Box>
      </Container>
    </Box>
  );
}
