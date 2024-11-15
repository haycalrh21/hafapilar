import { Box, Typography, Card, CardContent, Container } from "@mui/material";
import Image from "next/image";

export default function TeamCard() {
  return (
    <Box
      sx={{ my: 8 }}
      className="mx-5 border-9  border-black border-primary-main"
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        fontWeight="bold"
      >
        Meet the Team
      </Typography>
      <Typography
        variant="body1"
        paragraph
        align="center"
        sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
      >
        We bring a fresh, dynamic approach, uniting global recruitment
        expertise, deep local market insight, and reliable support to ensure
        success for international candidates
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {[
          {
            name: "Hanni Utfa",
            position: "Founder",
            image: "/assets/team/HaeniUlfa.png",
            university: "B.Sc Environmental Studies, University of Oregon, USA",
          },
          {
            name: "Frian Mandang",
            position: "Co-Founder",
            image: "/assets/team/FrianMardhani.png",
            university: "B.Sc Environmental Studies, University of Oregon, USA",
          },
          {
            name: "Susanna Kina",
            position: "Brand Director",
            image: "/assets/team/SyeanneHioe.png",
            university: "B.Sc Environmental Studies, University of Oregon, USA",
          },
        ].map((member, index) => (
          <Card
            key={index}
            elevation={1}
            sx={{
              width: { xs: "100%", sm: "250px" },
              borderRadius: 4,
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <Box sx={{ position: "relative", paddingTop: "100%" }}>
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <CardContent>
              <Typography variant="h6" component="div">
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.university}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
