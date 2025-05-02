import React from "react";
import "./ChartSection.css";
import { Box, Grid, Typography, Divider } from "@mui/material";
import EmployeesChart from "./charts/EmployeesChart";
import BenchedChart from "./charts/BenchedChart";
import ExperienceChart from "./charts/ExperienceChart";
import ChartCard from "./ChartCard";
import EmployeeCategoryChart from "./charts/EmployeeCategoryChart";
import BenchAgingChart from "./charts/BenchAgingChart";

const ChartSection = ({ employeeData }) => {
  const [categoryFilter, setCategoryFilter] = React.useState("All");
  const [experienceFilter, setExperienceFilter] = React.useState("All");

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        py: 3,
        backgroundColor: "#ffffff",
        fontFamily: "Poppins, sans-serif",
        border: "1px solid #e0e0e0",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        borderRadius: 2,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: "#241FA0",
          padding: "4px 10px",
          borderRadius: "4px",
        }}
      >
        Analytics & Visualization
      </Typography>

      {/* Row 1 - 4 Charts */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard title="Employees Overview">
              <Box sx={{ width: 220, height: 170 }}>
                <EmployeesChart employeeData={employeeData} />
              </Box>
            </ChartCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ChartCard title="Benched Overview">
              <Box sx={{ width: 220, height: 170 }}>
                <BenchedChart employeeData={employeeData} />
              </Box>
            </ChartCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ChartCard title="Bench Aging">
              <Box sx={{ width: 250, height: 170 }}>
                <BenchAgingChart employeeData={employeeData} />
              </Box>
            </ChartCard>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Row 2 - 2 Charts */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ChartCard
              title="Employee Categories"
              showFilter
              currentFilter={categoryFilter}
              onFilterChange={setCategoryFilter}
              filterOptions={["All", "Billable", "Shadow", "Benched"]}
            >
              <Box sx={{ width: 400, height: 220 }}>
                <EmployeeCategoryChart
                  filter={categoryFilter}
                  employeeData={employeeData}
                />
              </Box>
            </ChartCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ChartCard
              title="Experience Overview"
              showFilter
              currentFilter={experienceFilter}
              onFilterChange={setExperienceFilter}
              filterOptions={["All", "Billable", "Shadow", "Benched"]}
            >
              <Box sx={{ width: 400, height: 220 }}>
                <ExperienceChart
                  filter={experienceFilter}
                  employeeData={employeeData}
                />
              </Box>
            </ChartCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChartSection;
