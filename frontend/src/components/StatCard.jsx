import React from "react";
import "./StatCard.css";
import { Paper, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 200,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        color: "#000080",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1)",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "1.1rem" }}>
          {value}
        </Typography>
      </Box>
      {icon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            // backgroundColor: "white",
            boxShadow: `0px 4px 12px ${icon.props.color}`,
            padding: 1,
          }}
        >
          {icon}
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;
