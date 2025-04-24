import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BoyIcon from "@mui/icons-material/Boy";
import AirlineSeatReclineNormalOutlinedIcon from "@mui/icons-material/AirlineSeatReclineNormalOutlined";
import EscalatorWarningOutlinedIcon from "@mui/icons-material/EscalatorWarningOutlined";
import { calculateEmployeeStats } from "../utils/employeeUtils";
import StatCard from "./StatCard";

const StatCardsRow = ({ employeeData }) => {
  const [stats, setStats] = useState({
    total: "0",
    billable: "0",
    benched: "0",
    shadow: "0",
    interns: "0",
  });

  useEffect(() => {
    if (employeeData && employeeData.length > 0) {
      const stats = calculateEmployeeStats(employeeData);
      setStats(stats);
    }
  }, [employeeData]);

  const cards = [
    {
      title: "Total Employees",
      value: stats.total,
      icon: <GroupsIcon sx={{ fontSize: 24, color: "#3399ff" }} />,
    },
    {
      title: "Billable",
      value: stats.billable,
      icon: <MonetizationOnIcon sx={{ fontSize: 25, color: "#33cc33" }} />,
    },
    {
      title: "Benched",
      value: stats.benched,
      icon: (
        <AirlineSeatReclineNormalOutlinedIcon
          sx={{ fontSize: 25, color: "#ff0000" }}
        />
      ),
    },
    {
      title: "Shadow",
      value: stats.shadow,
      icon: <BoyIcon sx={{ fontSize: 27, color: "#ffff00" }} />,
    },
    {
      title: "Interns",
      value: stats.interns,
      icon: (
        <EscalatorWarningOutlinedIcon sx={{ fontSize: 25, color: "#ffcc00" }} />
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
