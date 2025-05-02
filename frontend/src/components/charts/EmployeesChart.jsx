import React, { useState } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";
import { calculateEmployeeStats } from "../../utils/employeeUtils";

const EmployeesChart = ({ employeeData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const stats = calculateEmployeeStats(employeeData);

  const chartLabels = ["Allocated", "Shadow", "Benched"];
  const chartDataset = [
    Number(stats.billable),
    Number(stats.shadow),
    Number(stats.benched),
  ];

  const getFilteredEmployees = (status) => {
    if (!employeeData) return [];
    switch (status) {
      case "Allocated":
        return employeeData.filter((emp) => emp.BenchStatus === "Allocated");
      case "Benched":
        return employeeData.filter((emp) => emp.BenchStatus === "Benched");
      case "Shadow":
        return employeeData.filter((emp) => emp.BenchStatus === "Shadow");
      default:
        return [];
    }
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Employee Status",
        data: chartDataset,
        backgroundColor: ["#36CFC9", "#FFD666", "#FF6B6B"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const status = chartLabels[index];
        setSelectedStatus(status);
        setEmployeeList(getFilteredEmployees(status));
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
      <ChartWrapper type="pie" data={chartData} options={options} />
      <EmployeeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        status={selectedStatus}
        employeeData={employeeList}
      />
    </>
  );
};

export default EmployeesChart;
