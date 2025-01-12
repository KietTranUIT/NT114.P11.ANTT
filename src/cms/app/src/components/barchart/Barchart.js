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
import { formatToVNDCustom } from "../../helpers";
import { useEffect } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function BarChart({ orders }) {
  function groupOrdersByDate(orders) {
    return orders.reduce((grouped, order) => {
      // Chuyển `createdAt` thành định dạng `dd/mm`
      const date = formatDate(new Date(order.createdAt));

      // Nếu key này chưa tồn tại trong grouped, khởi tạo nó
      if (!grouped[date]) {
        grouped[date] = [];
      }

      // Thêm đơn hàng vào nhóm tương ứng
      grouped[date].push(order);
      return grouped;
    }, {});
  }

  function getLast7Days() {
    let days = [];

    for (let i = 0; i < 7; i++) {
      // Lấy ngày hiện tại
      const date = new Date();

      // Trừ đi i ngày
      date.setDate(date.getDate() - i);

      // Định dạng lại thành dd/mm
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${day}/${month}`;

      // Thêm vào mảng kết quả
      days.push(formattedDate);
    }

    return days.reverse(); // Đảo ngược mảng để hiển thị từ ngày đầu tiên đến hiện tại
  }
  function formatDate(date) {
    // Định dạng ngày thành dd/mm
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  }

  function sortObjectArray(arr) {
    return arr.sort((a, b) => {
      const dateA = Object.keys(a)[0].split("/").map(Number); // Lấy ngày từ key của đối tượng
      const dateB = Object.keys(b)[0].split("/").map(Number);

      // So sánh theo tháng và ngày
      if (dateA[1] !== dateB[1]) {
        return dateA[1] - dateB[1]; // So sánh theo tháng
      } else {
        return dateA[0] - dateB[0]; // Nếu tháng bằng nhau, so sánh theo ngày
      }
    });
  }
  let labels = getLast7Days();

  const processData = () => {
    let result = groupOrdersByDate(orders);
    let data1 = [],
      data2 = [];
    labels.forEach((label) => {
      if (!result[label]) {
        data1.push(0);
        data2.push(0);
      } else {
        let completed = 0,
          notCompleted = 0;
        result[label].forEach((order) => {
          if (order.status != "completed") {
            notCompleted += 1;
          } else {
            completed += 1;
          }
        });
        data1.push(completed);
        data2.push(notCompleted);
      }
    });
    return [data1, data2];
  };
  let data = processData();

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Hoàn thành",
        data: data[0],
        borderColor: "#007bff", // Line color
        backgroundColor: "#007bff", // Fill color
        fill: false, // Disable filling under the line
      },
      {
        label: "Chưa hoàn thành",
        data: data[1],
        borderColor: "#e5edff", // Line color
        backgroundColor: "#e5edff", // Fill color
        fill: false, // Disable filling under the line
      },
    ],
  });

  useEffect(() => {
    let demo = processData()
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Hoàn thành",
          data: demo[0],
          borderColor: "#007bff", // Line color
          backgroundColor: "#007bff", // Fill color
          fill: false, // Disable filling under the line
        },
        {
          label: "Chưa hoàn thành",
          data: demo[1],
          borderColor: "#e5edff", // Line color
          backgroundColor: "#e5edff", // Fill color
          fill: false, // Disable filling under the line
        },
      ],
    });
  }, []);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        stacked: true,
        title: {
          display: true,
        },
        ticks: {
          font: {
            size: 8,
          },
          callback: function (value, index) {
            // Chỉ hiển thị label đầu tiên, giữa và cuối
            return chartData.labels[index]; // Hiển thị label

            // if (
            //   index === 0 ||
            //   index === Math.floor(chartData.labels.length / 2) ||
            //   index === chartData.labels.length - 1
            // ) {
            //   return chartData.labels[index]; // Hiển thị label
            // }
            return ""; // Ẩn các label còn lại
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          callback: function (value, index) {
            return value;
          },
        },
      },
    },
  };
  return (
    <>
      <div style={{ width: "100%", height: "250px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
}

export default BarChart;
