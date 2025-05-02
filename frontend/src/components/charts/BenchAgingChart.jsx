import React, { useState, useMemo } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";

const BenchAgingChart = ({ employeeData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAgingGroup, setSelectedAgingGroup] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const { labels, datasetData } = useMemo(() => {
    const now = new Date();

    let bucket1 = 0; // ≤ 15 Days
    let bucket2 = 0; // 15 - 45 Days
    let bucket3 = 0; // > 45 Days

    employeeData.forEach((emp) => {
      const benchDateStr = emp.BenchStartDate;
      if (!benchDateStr) return; // skip if null, undefined, or empty

      const benchStart = new Date(benchDateStr);
      const diffDays = Math.floor((now - benchStart) / (1000 * 60 * 60 * 24));

      if (diffDays <= 15) {
        bucket1++;
      } else if (diffDays <= 45) {
        bucket2++;
      } else {
        bucket3++;
      }
    });

    return {
      labels: ["≤ 15 Days", "15 - 45 Days", "> 45 Days"],
      datasetData: [bucket1, bucket2, bucket3],
    };
  }, [employeeData]);

  // Filter employees based on selected aging group
  const getFilteredEmployees = (agingGroup) => {
    if (!employeeData) return [];
    const now = new Date();

    return employeeData.filter((emp) => {
      const benchDateStr = emp.BenchStartDate;
      if (!benchDateStr) return false;

      const benchStart = new Date(benchDateStr);
      const diffDays = Math.floor((now - benchStart) / (1000 * 60 * 60 * 24));

      switch (agingGroup) {
        case "≤ 15 Days":
          return diffDays <= 15;
        case "15 - 45 Days":
          return diffDays > 15 && diffDays <= 45;
        case "> 45 Days":
          return diffDays > 45;
        default:
          return false;
      }
    });
  };

  // Chart data and options
  const data = {
    labels,
    datasets: [
      {
        label: "No. of Employees",
        data: datasetData,
        backgroundColor: ["#8884d8", "#82ca9d", "#ff7f50"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Number of Employees",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Bench Aging",
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const agingGroup = labels[index];
        setSelectedAgingGroup(agingGroup);
        setEmployeeList(getFilteredEmployees(agingGroup));
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
      <ChartWrapper type="bar" data={data} options={options} />
      <EmployeeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        status={selectedAgingGroup}
        employeeData={employeeList}
      />
    </>
  );
};

export default BenchAgingChart;
