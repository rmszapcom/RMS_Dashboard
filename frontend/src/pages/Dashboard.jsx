import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import StatCardsRow from "../components/StatCardsRow";
import ChartSection from "../components/ChartSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Profile menu state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7066/api/Employees")
      .then((result) => {
        setEmployeeData(result.data);
        setLoading(false);
      })
      .catch((err) => setError("Failed to load employee data"));
  }, []);

  return (
    <Box sx={{ width: "100%", p: 3, position: "relative" }}>
      {/* Profile Icon at top right */}
      <ProfileMenu />

      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#1C196E", fontWeight: 700, mb: 3 }}
      >
        PMO Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Box sx={{ width: "100%" }}>
            <StatCardsRow employeeData={employeeData} />
          </Box>

          <Box sx={{ width: "100%" }}>
            <ChartSection employeeData={employeeData} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
