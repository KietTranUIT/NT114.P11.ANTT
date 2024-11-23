// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartV1 = () => {
  // Data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"], // X-axis labels
    datasets: [
      {
        label: "Monthly Revenue",
        data: [3000, 4000, 5000, 6000, 7000, 8000], // Y-axis data points
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color under the line
        tension: 0.4, // Smooth line
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Company Revenue Growth",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start y-axis from 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartV1;