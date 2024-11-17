import "./linechart.css";
import React from "react";
import { useEffect, useState } from "react"
import { generateDayArray }from "./../../helpers";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
    const defaultValue = "Mar 1 - 31, 2022"
    const dataDefault = generateDayArray(defaultValue)
    
    const [ chartData, setChartData ] = useState({
        labels: dataDefault[1],
        datasets: [
            {
              label: dataDefault[0],
              data: [ 42, 85, 7, 99, 61, 20, 66, 89, 32, 14, 96, 80, 13, 57, 40, 77, 90, 71, 44, 10, 28, 11, 92, 65, 45, 34, 37, 100, 55, 38, 26 ],
              borderColor: 'orange',  // Line color
              backgroundColor: 'orange', // Fill color
              fill: false, // Disable filling under the line
              tension: 0.3 // Smooth the line
            },
            {
              label: dataDefault[0],
              data: [ 63, 54, 29, 88, 74, 41, 81, 23, 56, 19, 10, 37, 16, 60, 51, 30, 70, 72, 83, 47, 62, 24, 53, 48, 27, 9, 49, 85, 21, 36, 13 ],
              borderColor: '',  // Line color
              backgroundColor: 'gray', // Fill color
              borderDash: [5, 5], // Định dạng đứt nét: [dài đoạn, khoảng cách]
              fill: false, // Disable filling under the line
              tension: 0.3 // Smooth the line
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
    const handleSelectChange = (event) => {
        const selectValue = event.target.value
        const selectedDate = generateDayArray(selectValue)
        const data = {
            labels: selectedDate[1],
        datasets: [
            {
              label: dataDefault,
              data: [ 42, 85, 7, 99, 61, 20, 66, 89, 32, 14, 96, 80, 13, 57, 40, 77, 90, 71, 44, 10, 28, 11, 92, 65, 45, 34, 37, 100, 55, 38, 26 ],
              borderColor: 'rgba(75, 192, 192, 1)',  // Line color
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
              fill: false, // Disable filling under the line
              tension: 0.3 // Smooth the line
            },
            {
              label: dataDefault,
              data: [ 63, 54, 29, 88, 74, 41, 81, 23, 56, 19, 10, 37, 16, 60, 51, 30, 70, 72, 83, 47, 62, 24, 53, 48, 27, 9, 49, 85, 21, 36, 13 ],
              borderColor: 'rgba(255, 99, 132, 1)',  // Line color
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fill color
              fill: false, // Disable filling under the line
              tension: 0.3 // Smooth the line
            }
          ]
        }
        setChartData(data)

    }
        
    return (
        <>
        <div className="chart-container">
                        <div className="chart-header">
                            <div className="chart-header-total-sells">
                                <h1>Total sells</h1>
                                <p>Payment received across all channels</p>
                            </div>

                            <div className="chart-header-time">
                                <select name="option" className="date-selector" onChange={handleSelectChange}>
                                    <option value="1">Mar 1 - 31, 2022</option>
                                    <option value="1">Mar 1 - 31, 2022</option>
                                    <option value="1">Mar 1 - 31, 2022</option>
                                    <option value="1">Mar 1 - 31, 2022</option>
                                </select>
                            </div>
                        </div>
                        <div className="line-chart">
                            <Line data={chartData} options={options}/>
                        </div>
                    </div>
        </>
    )
}

export default LineChart;