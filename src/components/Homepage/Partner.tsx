import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Box,
} from "@mui/material";
import Link from "next/link";
export default function PartnerCard() {
  return (
    <div>
      <Box
        sx={{
          my: 8,
          bgcolor: "#0F4C5C",
          color: "white",
          py: 6,
          borderRadius: 4,
          textAlign: "center",
        }}
        className="mx-5 border-9  border-black border-primary-main"
      >
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Work with Us
        </Typography>
        <Typography variant="body1" paragraph>
          Let's work together to build your team
        </Typography>
        <Link href="/partner">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            //   sx={{ borderRadius: "25px", px: 4 }}
            className="rounded-s-md px-8 mb-4 font-bold"
          >
            Be Our Partner
          </Button>
        </Link>
      </Box>
    </div>
  );
}
