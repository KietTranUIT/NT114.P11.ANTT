// HalfCircleChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const procesData = (orders) => {
  let pending = 0, confirmed = 0, shipping = 0, completed = 0, cancelled = 0
  orders.forEach((order) => {
    if (order.status === 'pending') {
      pending += 1
    } else if (order.status === 'confirmed') {
      confirmed += 1
    } else if (order.status === 'shipping') {
      shipping += 1
    } else if (order.status === 'completed') {
      completed += 1
    } else {
      cancelled += 1
    }
  })
  return { pending, confirmed, shipping, completed, cancelled }
}

const HalfCircleChart = ({ orders }) => {
  const dt = procesData(orders)
  // Data for the chart
  const data = {
    labels: ["Chờ thanh toán", "Đặt hàng đã đặt", "Đang giao", "Thành công", "Đã hủy"],
    datasets: [
      {
        label: "Values",
        data: [dt.pending, dt.confirmed, dt.shipping, dt.completed, dt.cancelled],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Colors
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(34, 223, 78, 0.6)",
          "rgba(249, 19, 19, 0.6)",

        ],
        borderColor: [
          "rgba(255, 99, 132, 0.6)", // Colors
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(34, 223, 78, 0.6)",
          "rgba(249, 19, 19, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for a half-circle chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100%", height: "250px" }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default HalfCircleChart;
