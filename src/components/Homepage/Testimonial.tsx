"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Testimonial() {
  const [testimonialIndex, setTestimonialIndex] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const testimonials = [
    {
      text: "Thanks to this agency, I was able to land my dream job abroad! They guided me through every step of the process, from preparing my documents to training for interviews. The team was always supportive and made sure I was ready for everything. I'm so grateful and can provide a better future for my family.",
      author: "Mostar F.",
      position: "Cabin Steward in European Cruise",
    },
    {
      text: "This agency truly changed my life. I had always dreamed of working abroad, but didn’t know where to start. They not only helped me find a great job in Europe but also supported me with the visa process and even relocation. Their service went beyond my expectations, and now I’m earning more than I ever imagined.",
      author: "Dwi Ayu R.",
      position: "Waitress in Europe",
    },
    {
      text: "The process of working overseas seemed overwhelming, but this agency made it smooth and stress-free. They provided all the information I needed, and their team was very patient in answering my questions. Now, I’m working in a 5-star hotel in Dubai, living a life I never thought was possible. I owe it all to their dedication and hard work.",
      author: "Krisna M.",
      position: "Bartender in Dubai",
    },
    {
      text: "When I first applied, I was nervous about moving abroad, but this agency gave me the confidence I needed. They were with me every step of the way, from the job application to my first day at work in Qatar. The support they provided was exceptional, and now I’m able to support my family back home with a stable income.",
      author: "Bayu P.",
      position: "Laundry Steward in Hotel Qatar",
    },
  ];

  const handleNext = () => {
    setTestimonialIndex((prev) =>
      prev < testimonials.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : testimonials.length - 1
    );
  };

  return (
    <Box
      className="mx-20"
      sx={{
        my: 8,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: isMobile ? "center" : "flex-start",
        gap: 4,
      }}
    >
      {/* Left Section: Title and Button */}
      <Box
        sx={{
          width: isMobile ? "100%" : "30%",
          textAlign: isMobile ? "center" : "left",
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Our Success{" "}
          <span
            style={{
              backgroundColor: "#F2AF29CC",
              padding: "2px 2px 20px",
              marginRight: "10px",
              display: "inline-block",
              lineHeight: "0.1",
            }}
          >
            Stories
          </span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: "25px",
            px: 4,
            boxShadow: "0px 4px 10px rgba(255, 165, 0, 0.3)",
            alignSelf: isMobile ? "center" : "flex-start",
          }}
        >
          Be Our Partner
        </Button>
      </Box>

      {/* Right Section: Testimonial Carousel */}
      <Box
        sx={{ width: isMobile ? "100%" : "70%", position: "relative" }}
        className="my-4 "
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Card
            elevation={3}
            sx={{ borderRadius: 4, position: "relative", zIndex: 2 }}
          >
            <CardContent>
              <Typography variant="body1" paragraph>
                {testimonials[testimonialIndex].text}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {testimonials[testimonialIndex].author},{" "}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {testimonials[testimonialIndex].position}
              </Typography>
            </CardContent>
          </Card>
          {/* Back card with shadow and author */}

          <Card
            elevation={1}
            sx={{
              borderRadius: 4,
              position: "absolute",
              top: isMobile ? "10%" : "10%", // Adjust for mobile
              left: isMobile ? "20%" : "", // Adjust for mobile
              bottom: isMobile ? "-20%" : "-50px", // Adjust for mobile
              right: isMobile ? "-20%" : "-90px", // Adjust for mobile
              opacity: 0.6,
              transform: isMobile ? "scale(1.05)" : "scale(0.9)", // Slightly increase scale on mobile
              zIndex: 1,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
              padding: "1rem",
              backgroundColor: "#0F4C5C",
            }}
          >
            <CardContent className="">
              <Typography
                variant="body1"
                className="sm:my-3 lg:my-7"
                paragraph
                sx={{
                  color: "#FFFFFF", // Menggunakan warna putih agar teks lebih terlihat
                  opacity: 0.9, // Mengatur transparansi sedikit agar lebih halus
                }}
              >
                {
                  testimonials[(testimonialIndex + 1) % testimonials.length]
                    .text
                }
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#FFFFFF", // Menggunakan warna putih untuk kontras
                  opacity: 0.9,
                }}
              >
                {
                  testimonials[(testimonialIndex + 1) % testimonials.length]
                    .author
                }
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  color: "#FFFFFF", // Menggunakan warna putih untuk kontras
                  opacity: 0.9,
                }}
              >
                {testimonials[testimonialIndex].position}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 2,
            zIndex: 3,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: "-70px",
            top: "70%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 2,
            zIndex: 3,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
