import React from "react";
import { Grid, Box } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BoyIcon from "@mui/icons-material/Boy";
import AirlineSeatReclineNormalOutlinedIcon from "@mui/icons-material/AirlineSeatReclineNormalOutlined";
import EscalatorWarningOutlinedIcon from "@mui/icons-material/EscalatorWarningOutlined";
import StatCard from "./StatCard";

const StatCardsRow = () => {
  const cards = [
    {
      title: "Total Employees",
      value: "248",
      icon: <GroupsIcon color="primary" sx={{ fontSize: 24 }} />,
    },
    {
      title: "Billable",
      value: "120",
      icon: <MonetizationOnIcon color="success" sx={{ fontSize: 25 }} />,
    },
    {
      title: "Shadow",
      value: "20",
      icon: <BoyIcon color="secondary" sx={{ fontSize: 25 }} />,
    },
    {
      title: "Benched",
      value: "108",
      icon: (
        <AirlineSeatReclineNormalOutlinedIcon
          color="warning"
          sx={{ fontSize: 25 }}
        />
      ),
    },
    {
      title: "Interns",
      value: "8",
      icon: (
        <EscalatorWarningOutlinedIcon color="warning" sx={{ fontSize: 25 }} />
      ),
    },
  ];

  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif", width: "100%" }}>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={{ height: "100%" }}>
              <StatCard {...card} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatCardsRow;
