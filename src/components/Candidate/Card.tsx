import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

const departments = [
  {
    title: "Bar",
    image: "/assets/candidate/bartender.png",
    positions:
      "Head Bartender, Bartender, Asst. Bartender, Bar Boy, Bar Waiter",
  },
  {
    title: "Deck",
    image: "/assets/candidate/deck.png",

    positions:
      "AB Sailor, Ordinary Seaman, Fireman, Carpenter, Upholsterer, Waste Operator, Pest Controller",
  },
  {
    title: "Engine",
    image: "/assets/candidate/enginner.png",

    positions: "Plumber, Fitter, Oiler, Wiper",
  },
  {
    title: "Galley",
    image: "/assets/candidate/galley.png",

    positions:
      "CDP, DCDP, Pizza maker, Commis II Baker, Commis II Butcher, Commis II Cook, Food Carver, Asst. Kitchen Steward, Kitchen Utility",
  },
  {
    title: "Hotel",
    image: "/assets/candidate/hotel.png",

    positions:
      "Cabin Steward, Floor Runner, Hotel Cleaner, Pool Attendant, Crew Cleaner, Laundry, Linen keeper",
  },
  {
    title: "Restaurant",
    image: "/assets/candidate/restaurant.png",

    positions:
      "Head Waiter, Waiter, Asst. Waiter, Buffet Attendant, Wine keeper, Asst. Wine keeper, Mess Attendant",
  },
  {
    title: "Spa",
    image: "/assets/candidate/spa.png",

    positions: "Massage Therapist, Nail Specialist",
  },
];

const DepartmentCards = () => {
  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Select your preferred department
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {departments.map((department, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", sm: "100%", md: "33.33%", lg: "30%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                textAlign: "center",
                width: "100%",
                maxWidth: "345px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={department.image}
                alt={department.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {department.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Positions: {department.positions}
                </Typography>
              </CardContent>
              <Link
                href={{
                  pathname: "/candidate/form",
                  query: { department: department.title },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#0F4C5C",
                    maxWidth: "3xl",
                    width: "90%",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    mb: 4,
                  }}
                >
                  Apply
                </Button>
              </Link>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DepartmentCards;
