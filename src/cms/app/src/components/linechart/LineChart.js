import "./linechart.css";
import React from "react";
import { useEffect, useState } from "react";
import { generateDayArray, getOrders } from "./../../helpers";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const [rangeTime, setRangeTime] = useState([]);
  const [month, setMonth] = useState({
    currentMonth: new Date().getMonth(),
    compareMonth: new Date().getMonth() - 1 < 0 ? 1 : new Date().getMonth() - 1,
  });
  const months = getMonthsInCurrentYear();
  const [labels, setLabels] = useState([]);

  const fetchOrderData = async (m, t) => {
    console.log(m);
  };

  function getMonthsInCurrentYear() {
    const now = new Date(); // Lấy năm hiện tại
    const currentDate = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const months = [];

    for (let month = 0; month < 6; month++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - month,
        1
      ); // Tính ngược từng tháng
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1); // Ngày bắt đầu tháng
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Ngày cuối cùng tháng

      const startFormatted = `${startDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${startDate.getFullYear().toString().slice(-2)}`;
      const endFormatted = `${endDate.getDate().toString().padStart(2, "0")}/${(
        endDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${endDate.getFullYear().toString().slice(-2)}`;

      // Thêm thông tin của tháng vào mảng
      months.push({
        start: startDate.toISOString(), // Chuỗi thời gian UTC cho ngày bắt đầu
        end: endDate.toISOString(), // Chuỗi thời gian UTC cho ngày kết thúc
        value: `Tháng ${month + 1} ${startFormatted} - ${endFormatted}`, // Định dạng hiển thị
      });
    }

    return months;
  }

  // Lấy data doanh thu cho line chart
  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

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

  // Xử lí data
  const processData = (labels, orders) => {
    const result = groupOrdersByDate(orders);
    let data = labels.map((label) => {
      if (!result[label]) {
        return 0;
      }
      let total = 0;
      result[label].forEach((order) => {
        total += order.total;
      });
      return total;
    });
    return data;
  };

  useEffect(() => {
    const indexCurrent = months[month.currentMonth];
    const indexCompare = months[month.compareMonth];
    const labels = getDaysFromMonthValue(indexCurrent.value);
    const fetchData = async () => {
      let httpRes = await getOrders({
        manage: true,
        analysis: true,
        start_time: indexCurrent.start,
        end_time: indexCurrent.end,
      });
      let data1 = [];
      if (httpRes.status === 200) {
        data1 = processData(labels, httpRes.data.data);
      }

      httpRes = undefined;
      httpRes = await getOrders({
        manage: true,
        analysis: true,
        start_time: indexCompare.start,
        end_time: indexCompare.end,
      });
      console.log(httpRes)
      let data2 = [];
      if (httpRes.status === 200) {
        data2 = processData(labels, httpRes.data.data);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: indexCurrent.value,
            data: data1,
            borderColor: "#007bff", // Line color
            backgroundColor: "#007bff", // Fill color
            fill: false, // Disable filling under the line
            tension: 0, // Smooth the line
            pointRadius: 0,
          },
          {
            label: indexCompare.value,
            data: data2,
            borderColor: "#7cc7f2", // Line color
            backgroundColor: "#7cc7f2", // Fill color
            borderDash: [6, 3], // Định dạng đứt nét: [dài đoạn, khoảng cách]
            fill: false, // Disable filling under the line
            tension: 0, // Smooth the line
            pointRadius: 0,
          },
        ],
      });
    };
    fetchData();
  }, [month]);

  const defaultValue = "Mar 1 - 31, 2022";
  const dataDefault = generateDayArray(defaultValue);

  function getDaysFromMonthValue(value) {
    const dateRegex = /(\d{2}\/\d{2}\/\d{2}) - (\d{2}\/\d{2}\/\d{2})/;
    const matches = value.match(dateRegex);

    if (!matches) {
      throw new Error("Chuỗi không đúng định dạng.");
    }

    const [_, startDateStr, endDateStr] = matches;
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);

    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  function parseDate(dateStr) {
    // Chuyển đổi từ dd/mm/yy thành Date
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(2000 + year, month - 1, day); // Cộng 2000 để đảm bảo năm đầy đủ
  }

  function formatDate(date) {
    // Định dạng ngày thành dd/mm
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  }

  const [chartData, setChartData] = useState({
    labels: [
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
      "Thứ hai",
    ],
    datasets: [
      {
        label: dataDefault[0],
        data: [
          42, 85, 7, 99, 61, 20, 66, 89, 32, 14, 96, 80, 13, 57, 40, 77, 90, 71,
          44, 10, 28, 11, 92, 65, 45, 34, 37, 100, 55, 38, 26,
        ],
        borderColor: "#007bff", // Line color
        backgroundColor: "#007bff", // Fill color
        fill: false, // Disable filling under the line
        tension: 0, // Smooth the line
        pointRadius: 5,
      },
      {
        label: dataDefault[0],
        data: [
          63, 54, 29, 88, 74, 41, 81, 23, 56, 19, 10, 37, 16, 60, 51, 30, 70,
          72, 83, 47, 62, 24, 53, 48, 27, 9, 49, 85, 21, 36, 13,
        ],
        borderColor: "#7cc7f2", // Line color
        backgroundColor: "#7cc7f2", // Fill color
        borderDash: [6, 3], // Định dạng đứt nét: [dài đoạn, khoảng cách]
        fill: false, // Disable filling under the line
        tension: 0, // Smooth the line
        pointRadius: 5,
      },
    ],
  });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        // Tùy chỉnh cách tooltip hiển thị
        callbacks: {
          // Tùy chỉnh để hiển thị bảng đối chiếu khi hover
          // title: function (tooltipItems) {
          //   console.log(tooltipItems)
          //   // Hiển thị tên ngày
          //   return `Date: ${tooltipItems[0].label}`;
          // },
          // label: function (tooltipItem) {
          //   console.log(tooltipItem)
          //   // Hiển thị giá trị của mỗi đường tại điểm được hover
          //   return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          // },
          // afterBody: function (tooltipItems) {
          //   console.log(tooltipItems)
          //   // Hiển thị bảng đối chiếu cho cả hai đường
          //   const salesA =
          //     tooltipItems[0].dataset.label === "Sales A"
          //       ? tooltipItems[0].raw
          //       : tooltipItems[1].raw;
          //   const salesB =
          //     tooltipItems[0].dataset.label === "Sales B"
          //       ? tooltipItems[0].raw
          //       : tooltipItems[1].raw;
          //   return `Sales A: ${salesA}\nSales B: ${salesB}`;
          // },
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
          callback: function (value, index) {
            // Chỉ hiển thị label đầu tiên, giữa và cuối
            return chartData.labels[index];
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
  const handleSelectChange = (event) => {
    const selectValue = event.target.value;
    const selectedDate = generateDayArray(selectValue);
    const data = {
      labels: selectedDate[1],
      datasets: [
        {
          label: dataDefault,
          data: [
            42, 85, 7, 99, 61, 20, 66, 89, 32, 14, 96, 80, 13, 57, 40, 77, 90,
            71, 44, 10, 28, 11, 92, 65, 45, 34, 37, 100, 55, 38, 26,
          ],
          borderColor: "rgba(75, 192, 192, 1)", // Line color
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
          fill: false, // Disable filling under the line
          tension: 0, // Smooth the line
        },
        {
          label: dataDefault,
          data: [
            63, 54, 29, 88, 74, 41, 81, 23, 56, 19, 10, 37, 16, 60, 51, 30, 70,
            72, 83, 47, 62, 24, 53, 48, 27, 9, 49, 85, 21, 36, 13,
          ],
          borderColor: "rgba(255, 99, 132, 1)", // Line color
          backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color
          fill: false, // Disable filling under the line
          tension: 0, // Smooth the line
        },
      ],
    };
    setChartData(data);
  };

  return (
    <>
      <div className="">
        <div className="flex row mb-3">
          <div className="flex col-6">
            <h3 className="mb-0">Tổng doanh thu</h3>
            <p className="d-inline">
              Thanh toán nhận được trên tất cả các kênh
            </p>
          </div>

          <div className="col-6 row">
            <div className="col-12 row">
              <>
                <div className="col-6">
                  <label>Tháng hiện tại: </label>
                  <select
                    className="form-select form-select-sm"
                    aria-label="Default select example"
                    onChange={(event) => {
                      console.log("demo", event.target.value);
                      console.log(event.currentTarget.value);
                      setMonth({
                        ...month,
                        currentMonth: event.currentTarget.value,
                      });
                      fetchOrderData(event.target.value, "current");
                    }}
                  >
                    {months.map((time, index) => {
                      if (month.currentMonth === index) {
                        return (
                          <option value={index} selected>
                            {time.value}
                          </option>
                        );
                      }
                      return <option value={index}>{time.value}</option>;
                    })}
                  </select>
                </div>
                <div className="col-6">
                  <label>Tháng so sánh: </label>
                  <select
                    className="form-select form-select-sm"
                    aria-label="Default select example"
                    onChange={(event) => {
                      setMonth({ ...month, compareMonth: event.target.value });
                    }}
                  >
                    {months.map((time, index) => {
                      if (month.compareMonth === index) {
                        return (
                          <option value={index} selected>
                            {time.value}
                          </option>
                        );
                      }
                      return <option value={index}>{time.value}</option>;
                    })}
                  </select>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="line-chart">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}

export default LineChart;
