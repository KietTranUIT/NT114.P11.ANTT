import "./barchart.css";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const [ chartData, setChartData ] = useState({
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
        {
          label: 'test',
          data: [ 42, 85, 7, 99, 61, 20, 66, 89, 32, 14, 96, 80, 13, 57, 40, 77, 90, 71, 44, 10, 28, 11, 92, 65, 45, 34, 37, 100, 55, 38, 26 ],
          borderColor: 'orange',  // Line color
          backgroundColor: 'orange', // Fill color
          fill: false, // Disable filling under the line
        }
      ]
})
const options = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: true, // Bật tooltip
            callbacks: {
              title: (tooltipItems) => {
                return `${tooltipItems[0].label}`;
              },
              label: (tooltipItem) => {
                // Hiển thị giá trị của từng dataset
                const dataset = tooltipItem.dataset;
                const value = dataset.data[tooltipItem.dataIndex];
                return `Total sells: ${value}`;
              },
            },
          },
      },
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
            font: {
                size: 8,
            },
            callback: function(value, index) {
              // Chỉ hiển thị label đầu tiên, giữa và cuối
              if (index === 0 || index === Math.floor(chartData.labels.length / 2) || index === chartData.labels.length - 1) {
                return chartData.labels[index]; // Hiển thị label
              }
              return ''; // Ẩn các label còn lại
            },
          },
      },
      y: {
        title: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
            callback: function(value, index) {
                return '';
            }
        }
      }
    }
  };
  return (
    <>
    <Bar data={chartData} options={options}/>
    </>
  )
}

export default BarChart;