import React, { useState, useMemo } from "react";
import ChartWrapper from "./ChartWrapper";
import EmployeeModal from "../employeeModals/EmployeeModal";

const BenchAgingChart = ({ employeeData = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAgingGroup, setSelectedAgingGroup] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const now = useMemo(() => new Date(), []);

  const isValidDate = (date) => {
    const parsed = new Date(date);
    return parsed instanceof Date && !isNaN(parsed);
  };

  const { labels, datasetData } = useMemo(() => {
    let bucket1 = 0;
    let bucket2 = 0;
    let bucket3 = 0;

    employeeData.forEach((emp) => {
      const benchDateStr = emp.benchStartDate || emp.BenchStartDate;
      if (!benchDateStr || !isValidDate(benchDateStr)) return;

      const benchStart = new Date(benchDateStr);
      const diffDays = Math.floor((now - benchStart) / (1000 * 60 * 60 * 24));

      if (diffDays <= 15) bucket1++;
      else if (diffDays <= 45) bucket2++;
      else bucket3++;
    });

    return {
      labels: ["≤ 15 Days", "15 - 45 Days", "> 45 Days"],
      datasetData: [bucket1, bucket2, bucket3],
    };
  }, [employeeData, now]);
  

  const getFilteredEmployees = (group) => {
    return employeeData.filter((emp) => {
      const dateStr = emp.benchStartDate || emp.BenchStartDate;
      if (!dateStr || !isValidDate(dateStr)) return false;

      const diffDays = Math.floor((now - new Date(dateStr)) / (1000 * 60 * 60 * 24));

      switch (group) {
        case "≤ 15 Days": return diffDays <= 15;
        case "15 - 45 Days": return diffDays > 15 && diffDays <= 45;
        case "> 45 Days": return diffDays > 45;
        default: return false;
      }
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Employees",
        data: datasetData,
        backgroundColor: ["#8884d8", "#82ca9d", "#ff7f50"],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
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
        const group = labels[index];
        setSelectedAgingGroup(group);
        setEmployeeList(getFilteredEmployees(group));
        setModalOpen(true);
      }
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement.length > 0 ? "pointer" : "default";
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