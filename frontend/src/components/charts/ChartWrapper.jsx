import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartWrapper = ({
  type = "pie",
  data,
  options,
  width = "100%",
  height = "100%",
}) => {
  const chartMap = {
    pie: Pie,
    doughnut: Doughnut,
    bar: Bar,
    line: Line,
  };

  const ChartComponent = chartMap[type.toLowerCase()];

  if (!ChartComponent) {
    return <p>Unsupported chart type: {type}</p>;
  }

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default ChartWrapper;
