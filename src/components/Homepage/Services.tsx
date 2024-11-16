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

export default function Services() {
  return (
    <Box className="flex flex-col md:flex-cold justify-between items-center relative overflow-hidden mb-6 mx-4 -top-20">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        fontWeight="bold"
        style={{ position: "relative" }}
      >
        We Offer{" "}
        <span
          style={{
            backgroundColor: "#F2AF29CC",
            padding: "2px 0px 20px",
            display: "inline-block",
            lineHeight: "0.1",
          }}
        >
          Best Services
        </span>
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          {
            icon: (
              <Box
                component="img"
                src="/assets/services/talent.png"
                alt="Hero Image"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "600px",
                  borderRadius: "0 0 0 50%",
                }}
              />
            ),
            title: "Talent Acquisition & Recruitment",
          },
          {
            icon: (
              <Box
                component="img"
                src="/assets/services/training.png"
                alt="Hero Image"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "600px",
                  borderRadius: "0 0 0 50%",
                }}
              />
            ),
            title: "Training Center Facility & Language Courses",
          },
          {
            icon: (
              <Box
                component="img"
                src="/assets/services/employee.png"
                alt="Hero Image"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "600px",
                  borderRadius: "0 0 0 50%",
                }}
              />
            ),
            title: "Employee Onboarding & Management",
          },
        ].map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={1}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                borderRadius: 4,
              }}
            >
              <Box sx={{ mb: 2 }}>{service.icon}</Box>
              <Typography
                variant="h6"
                component="h3"
                align="center"
                gutterBottom
              >
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                We specialize in sourcing and recruiting top talent to drive
                your business forward
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
