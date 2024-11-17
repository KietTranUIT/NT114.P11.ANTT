// HalfCircleChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const HalfCircleChart = () => {
  // Data for the chart
  const data = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [
      {
        label: "Values",
        data: [40, 30, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Colors
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for a half-circle chart
  const options = {
    responsive: true,
    cutout: "50%", // Creates the doughnut hole
    rotation: -90, // Rotate to start from the top
    circumference: 180, // Display only half the chart
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default HalfCircleChart;
