import { Box, Container, Typography, Link, Stack } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, mt: 8, color: "black" }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Box>
            <Image
              src="/assets/logo.png"
              alt="Hafa Pilar Logo"
              width={150}
              height={50}
            />
            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
              Jl. Bougenvile No.32, Jakarta Utara, Indonesia, 14230
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Get in Touch
            </Typography>
            <Stack direction="row" spacing={3} alignItems="center">
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
        <Box display="flex" gap={2} mt={4} justifyContent="start">
          <Image
            src="/assets/footerbot.png"
            alt="Lloyd's Register"
            width={500}
            height={50}
          />
        </Box>
      </Container>
    </Box>
  );
}
