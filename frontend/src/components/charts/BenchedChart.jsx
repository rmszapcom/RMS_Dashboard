import React, { useMemo, useState } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";

const calculateBenchedEmployees = (employeeData) => {
  const inTraining = [];
  const workingOnInternalProjects = [];
  const noPlans = [];

  employeeData.forEach((emp) => {
    const remarks = emp.remarks?.trim().toLowerCase() || "";
    const status = emp.status?.trim().toLowerCase() || "";

    if (remarks === "internal") {
      // Include all Internal cases, regardless of status
      workingOnInternalProjects.push(emp);
    } else if (remarks === "training" && status === "bench") {
      inTraining.push(emp);
    } else if (remarks === "no plan" && status === "bench") {
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
    labels: ["Training", "Internal", "No Plan"],
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
          case "Internal":
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
