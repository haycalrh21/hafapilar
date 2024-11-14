import { Box, Grid, Typography } from "@mui/material";

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
        </span>{" "}
        So Far
      </Typography>
      <Box
        sx={{
          my: 8,
          bgcolor: "#0F4C5C",
          color: "white",
          py: 6,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                component="div"
                fontWeight="bold"
                className="text-yellow-400"
              >
                9000+
              </Typography>
              <Typography variant="body1">Deployed Abroad</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                component="div"
                fontWeight="bold"
                className="text-yellow-400"
              >
                4+
              </Typography>
              <Typography variant="body1">Big Clients</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                component="div"
                fontWeight="bold"
                className="text-yellow-400"
              >
                30 Years
              </Typography>
              <Typography variant="body1">
                of Operations in Indonesia
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                component="div"
                fontWeight="bold"
                className="text-yellow-400"
              >
                90%
              </Typography>
              <Typography variant="body1">Successful Placement Rate</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
