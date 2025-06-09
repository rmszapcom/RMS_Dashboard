import React, { useState, useMemo } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";

const baseLabels = ["Junior", "Mid-Senior", "Senior"];

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    x: { title: { display: true, text: "Experience Level" } },
    y: { title: { display: true, text: "Employees" }, beginAtZero: true },
  },
};

const calculateExperienceFromStartDate = (dateString) => {
  if (!dateString) return 0;

  const startDate = new Date(dateString);
  const now = new Date();

  if (isNaN(startDate)) return 0;

  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  return +(totalMonths / 12).toFixed(2); // round to 2 decimal places
};

const ExperienceChart = ({ employeeData, filter = "All" }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  // In ExperienceChart.jsx

  const experienceCounts = useMemo(() => {
    let junior = 0;
    let mid = 0;
    let senior = 0;

    employeeData.forEach((emp) => {
      const experience = calculateExperienceFromStartDate(emp.careerStartDate);
      const status = (emp.status || "").toLowerCase().trim();
      const normalizedFilter = filter.toLowerCase().trim();

      if (filter !== "All" && status !== normalizedFilter) return;

      if (experience < 3) junior++;
      else if (experience <= 6) mid++;
      else senior++;
    });

    return [junior, mid, senior];
  }, [employeeData, filter]);

  const getFilteredEmployees = (experienceLevel) => {
    if (!employeeData) return [];
    const normalizedFilter = filter.toLowerCase().trim();

    return employeeData.filter((emp) => {
      const experience = calculateExperienceFromStartDate(
        emp.overAllExperience
      );
      const status = (emp.status || "").toLowerCase().trim();
      let levelMatch = false;

      if (experienceLevel === "Junior" && experience < 3) levelMatch = true;
      else if (experienceLevel === "Mid-Senior" && experience <= 6)
        levelMatch = true;
      else if (experienceLevel === "Senior" && experience > 6)
        levelMatch = true;

      return levelMatch && (filter === "All" || status === normalizedFilter);
    });
  };

  const chartData = {
    labels: baseLabels,
    datasets: [
      {
        label: "Experience Level",
        data: experienceCounts,
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const optionsWithClickHandler = {
    ...options,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const experienceLevel = baseLabels[index];
        setSelectedExperienceLevel(experienceLevel);
        setEmployeeList(getFilteredEmployees(experienceLevel));
        setModalOpen(true);
      }
    },
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        event.native.target.style.cursor = "pointer";
      } else {
        event.native.target.style.cursor = "default";
      }
    },
  };

  return (
    <>
      <ChartWrapper
        type="bar"
        data={chartData}
        options={optionsWithClickHandler}
      />
      <EmployeeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        status={selectedExperienceLevel}
        employeeData={employeeList}
      />
    </>
  );
};

export default ExperienceChart;
