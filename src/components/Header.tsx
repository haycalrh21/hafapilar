import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <div>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ bgcolor: "transparent" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="Hafa Pilar Logo"
                  width={150}
                  height={50}
                />
              </Link>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              // sx={{ borderRadius: "20px", px: 3 }}
              className="rounded-s-md px-3 mr-4 border-2 border-primary-main font-bold"
            >
              Apply as Candidate
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
