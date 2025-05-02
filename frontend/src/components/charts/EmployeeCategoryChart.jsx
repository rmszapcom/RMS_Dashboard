import React, { useState, useMemo } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";

const skillLabels = [
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
  "Scrum Master",
  "Product Manager",
  "Engineering Manager",
  "Technical Lead",
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};

const EmployeeCategoryChart = ({ employeeData, filter = "All" }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const categoryCounts = useMemo(() => {
    const counts = new Array(skillLabels.length).fill(0);

    employeeData.forEach((emp) => {
      const category = emp.SkillCategory?.trim();
      const status = emp.BenchStatus?.toLowerCase();
      const normalizedFilter = filter.toLowerCase();

      if (filter !== "All" && status !== normalizedFilter) return;

      const index = skillLabels.findIndex(
        (label) => label.toLowerCase() === category?.toLowerCase()
      );
      if (index !== -1) counts[index]++;
    });

    return counts;
  }, [employeeData, filter]);

  // Filter employees based on selected category and status filter
  const getFilteredEmployees = (category) => {
    if (!employeeData) return [];
    const normalizedCategory = category.toLowerCase();
    const normalizedFilter = filter.toLowerCase();

    return employeeData.filter((emp) => {
      const category = emp.SkillCategory?.trim().toLowerCase();
      const status = emp.BenchStatus?.toLowerCase();
      return (
        category === normalizedCategory &&
        (filter === "All" || status === normalizedFilter)
      );
    });
  };

  const chartData = {
    labels: skillLabels,
    datasets: [
      {
        label: "Employee Categories",
        data: categoryCounts,
        backgroundColor: [
          "#8884d8",
          "#82ca9d",
          "#ffc658",
          "#ff7f50",
          "#8dd1e1",
          "#d0ed57",
          "#a4de6c",
          "#d66aff",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const optionsWithClickHandler = {
    ...options,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const category = skillLabels[index];
        setSelectedCategory(category);
        setEmployeeList(getFilteredEmployees(category));
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
        type="doughnut"
        data={chartData}
        options={optionsWithClickHandler}
      />
      <EmployeeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        status={selectedCategory}
        employeeData={employeeList}
      />
    </>
  );
};

export default EmployeeCategoryChart;
