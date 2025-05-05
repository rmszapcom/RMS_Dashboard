import React, { useMemo, useState } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";

const calculateBenchedEmployees = (employeeData) => {
  const benchedEmployees = employeeData.filter(
    (emp) => emp.BenchStatus === "Benched"
  );

  // Categories
  const inTraining = [];
  const workingOnInternalProjects = [];
  const noPlans = [];

  benchedEmployees.forEach((emp) => {
    const isInTraining = emp.EngagementPlans.some((plan) =>
      plan.PlanName.toLowerCase().includes("training")
    );

    if (isInTraining) {
      inTraining.push(emp);
    }

    const isWorkingOnInternalProject = emp.Allocations.some(
      (alloc) => alloc.Client.toLowerCase() === "internal"
    );

    if (isWorkingOnInternalProject) {
      workingOnInternalProjects.push(emp);
    }

    const hasNoPlans = emp.EngagementPlans.length === 0;
    if (hasNoPlans) {
      noPlans.push(emp);
    }
  });

  return {
    inTraining,
    workingOnInternalProjects,
    noPlans,
  };
};

const BenchedChart = ({ employeeData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const benchedEmployeeCategories = useMemo(
    () => calculateBenchedEmployees(employeeData),
    [employeeData]
  );

  const data = {
    labels: ["Training", "Internal Project", "No Plan"],
    datasets: [
      {
        label: "Benched Employees",
        data: [
          benchedEmployeeCategories.inTraining.length,
          benchedEmployeeCategories.workingOnInternalProjects.length,
          benchedEmployeeCategories.noPlans.length,
        ],
        backgroundColor: ["#FF8042", "#00C49F", "#FFBB28"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    hoverOffset: 10,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        event.native.target.style.cursor = "pointer";
      } else {
        event.native.target.style.cursor = "default";
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const category = data.labels[index];

        // Set selected category and employees based on click
        setSelectedCategory(category);

        switch (category) {
          case "Training":
            setEmployeeList(benchedEmployeeCategories.inTraining);
            break;
          case "Internal Project":
            setEmployeeList(
              benchedEmployeeCategories.workingOnInternalProjects
            );
            break;
          case "No Plan":
            setEmployeeList(benchedEmployeeCategories.noPlans);
            break;
          default:
            setEmployeeList([]);
        }

        setModalOpen(true);
      }
    },
  };

  return (
    <>
      <ChartWrapper type="pie" data={data} options={options} />
      <EmployeeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        status={selectedCategory}
        employeeData={employeeList}
      />
    </>
  );
};

export default BenchedChart;
