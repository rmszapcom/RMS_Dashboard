import React from "react";
import "./Dashboard.css";
import { Box, Typography } from "@mui/material";
import StatCardsRow from "../components/StatCardsRow";
import ChartSection from "../components/ChartSection";

const Dashboard = () => {
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#1C196E", fontWeight: 700, mb: 3 }}
      >
        PMO Dashboard
      </Typography>

      {/* Full width row */}
      <Box sx={{ width: "100%" }}>
        <StatCardsRow />
      </Box>

      {/* Chart section here
      <Box sx={{ width: "100%" }}>
        <ChartSection />
      </Box> */}
    </Box>
  );
};

export default Dashboard;
