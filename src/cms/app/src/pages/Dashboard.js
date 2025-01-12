import "./css/dashboard.css";
import Panel from "./../components/panel/Panel";
import Header from "./../components/header/Header";
import LineChart from "./../components/linechart/LineChart";
import BarChart from "./../components/barchart/Barchart";
import CircleChart from "./../components/circlechart/Circlechart";
import LineChartV1 from "./../components/linechartv1/Linechartv1";
import HalfCircleChart from "./../components/halfcirclechart/HalfCircleChart";
import { useState, useEffect } from "react";
import { result } from "lodash";
import { formatToVNDCustom, getOrders, getReview } from "../helpers";
const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const time = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      let httpRes = await getOrders({
        manage: true,
        time_after: new Date(time.setHours(0, 0, 0, 0)),
      });
      setOrders(httpRes.data.data);

      httpRes = await getReview();

      setReviews(httpRes.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    let sum = 0;
    orders.forEach((order) => {
      sum += order.total;
    });
    setTotal(sum);
  }, [orders]);
  function formatDateToDDMMYY(dateString) {
    // Chuyển chuỗi ISO 8601 sang đối tượng Date
    let date = dateString != null ? new Date(dateString) : new Date();

    // Lấy ngày, tháng, năm từ đối tượng Date
    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo ngày luôn có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cộng thêm 1
    const year = String(date.getFullYear()); // Lấy 2 chữ số cuối của năm

    // Trả về định dạng dd/mm/yy
    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <Header />
      <Panel navId={"dashboard-nav"} />

      <div className="content ps-4">
        <div className="main-content-header">
          <h1>Ecommerce Dashboard</h1>
          <span>Welcome to ecommerce Dashboard</span>
        </div>

        <div className="ecommerce-dashboard">
          <hr />
          <div className="">
            <div>
              <LineChart />
            </div>
          </div>
          <div className="">
            <div className="row g-2">
              <div className="col-6 p-3 ps-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title fw-semibold d-flex justify-content-between">
                      <div>
                        <div className="d-flex gap-3">
                          <span>Tổng số đơn hàng</span>
                          <span className="percentage-change positive d-flex align-items-center">
                            +26.5%
                          </span>
                        </div>
                        <span
                          style={{ fontSize: "13px", fontWeight: "normal" }}
                        >
                          7 ngày gần đây
                        </span>
                      </div>
                      <span>{formatToVNDCustom(total)}</span>
                    </h5>
                    <BarChart orders={orders} />
                  </div>
                </div>
              </div>
              <div className="col-6 p-3 ps-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title fw-semibold d-flex justify-content-between">
                      <div>
                        <div className="d-flex gap-3">
                          <span>Đơn hàng</span>
                        </div>
                        <span
                          style={{ fontSize: "13px", fontWeight: "normal" }}
                        >
                          7 ngày gần đây
                        </span>
                      </div>
                    </h5>
                  </div>
                  <div className="d-flex justify-content-center">
                    <HalfCircleChart orders={orders} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-container border rounded">
          <h2>Những đánh giá gần đây</h2>
          <p>Trong 7 ngày</p>
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Đánh giá</th>
                <th>Nội dung</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => {
                return (
                  <tr>
                    <td>{review.user.email}</td>
                    <td>
                      <div className="rate">
                        {[1, 2, 3, 4, 5].map((key, index) => {
                          if (index < Math.round(review.rating)) {
                            return (
                              <svg
                                className="svg-inline--fa fa-star text-warning"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="star"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                data-fa-i2svg=""
                                width="20px"
                                height="20px"
                                key={index}
                              >
                                <path
                                  fill="currentColor"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                ></path>
                              </svg>
                            );
                          }
                          return (
                            <svg
                              className="svg-inline--fa fa-star text-warning-light fs-9 me-1"
                              data-bs-theme="light"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="far"
                              data-icon="star"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                              width="20px"
                              height="20px"
                              key={index}
                            >
                              <path
                                fill="currentColor"
                                d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                              ></path>
                            </svg>
                          );
                        })}
                      </div>
                    </td>
                    <td className="truncate">{review.content}</td>
                    <td>{formatDateToDDMMYY(review.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
