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
  Avatar,
  IconButton,
} from "@mui/material";
export default function ImpactCard() {
  return (
    <div>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        fontWeight="bold"
      >
        Our{" "}
        <span
          style={{
            backgroundColor: "#F2AF29CC",
            padding: "2px 2px 20px",
            marginRight: "10px",
            display: "inline-block",
            lineHeight: "0.1",
          }}
        >
          Impact
        </span>
        <span>So Far</span>
      </Typography>
      <Box
        sx={{
          my: 8,
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {[
            { number: "9000+", label: "Deployed Abroad" },
            { number: "4+", label: "Big Clients" },
            { number: "30 Years", label: "of Operations in Indonesia" },
            { number: "90%", label: "Successful Placement Rate" },
          ].map((stat, index) => (
            <Grid item key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="body1">{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
