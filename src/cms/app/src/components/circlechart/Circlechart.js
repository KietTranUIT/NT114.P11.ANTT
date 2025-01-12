// CircleChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = () => {
  // Data for the chart
  const data = {
    labels: ["Electronics", "Groceries", "Clothing", "Others"],
    datasets: [
      {
        label: "Category Distribution",
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0, // Padding phía trên
        bottom: 0, // Padding phía dưới
        left: 0, // Padding phía trái
        right: 0, // Padding phía phải
      },
    },
    plugins: {
      legend: {
        position: "right", // Đặt chú giải (legend) ở bên phải
        labels: {
          font: {
            size: 14, // Kích thước chữ của chú giải
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${context}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: "250px", height: "250px" }}
    >
      <Pie data={data} options={options} />
    </div>
  );
};

export default CircleChart;
