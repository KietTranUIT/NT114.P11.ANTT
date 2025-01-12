import { useState, useEffect } from "react";
import Loading from "../../components/loading/loading";
import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import Autocomplete from "@mui/joy/Autocomplete";
import { FormControl, FormLabel, Button, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";
import Modal from "../../components/modal/modal";
import { usePagination, DOTS } from "../../helpers/pagination";
import "./order.css";
import { getOrders } from "../../helpers";
import OrderDetail from "./orderDetail";
import Backpage from "../../components/backpage/backpage";

function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState("order");
  const [showModal, setShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 4,
  });
  let paginationRange = usePagination(pagination);
  const [currentNav, setCurrentNav] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const httpRes = await getOrders({ manage: true, total: true });
      console.log(httpRes);
      setPagination({ ...pagination, totalCount: httpRes.data.total });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const httpRes = await getOrders({
        manage: true,
        status: currentNav === "all" ? undefined : currentNav,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      });
      if (httpRes.status === 200) {
        setOrders(httpRes.data.data);
      }
    };
    fetchData();
  }, [currentNav]);
  useEffect(() => {
    const fetchData = async () => {
      const httpRes = await getOrders({
        manage: true,
        status: currentNav === "all" ? undefined : currentNav,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      });
      if (httpRes.status === 200) {
        setOrders(httpRes.data.data);
      }
    };
    fetchData();
  }, [currentNav, pagination]);

  // Thay đổi nav item hiện tại
  const changeNav = (event) => {
    event.preventDefault();
    let order_status = event.currentTarget.dataset.status;
    let li = document.querySelectorAll(".nav-item");
    li.forEach((item) => {
      if (item.classList.contains("nav-target")) {
        item.classList.remove("nav-target");
      }
      if (order_status === item.dataset.status) {
        item.classList.add("nav-target");
        return;
      }
    });
      setCurrentNav(order_status);
      setPagination({
        totalCount: 0,
        siblingCount: 1,
        currentPage: 1,
        pageSize: 4,
      })
  };

  const handleNextClick = async (event) => {
    const totalPageNumbers = Math.ceil(
      pagination.totalCount / pagination.pageSize
    );
    const pageNumber = pagination.currentPage + 1;
    if (pageNumber > totalPageNumbers) {
      return;
    }
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handlePrevClick = async (event) => {
    const pageNumber = pagination.currentPage - 1;
    if (pageNumber <= 0) {
      return;
    }
    setPagination({ ...pagination, currentPage: pageNumber });
  };
  const handleChangePage = async (event) => {
    const pageNumber = parseInt(event.currentTarget.dataset.page);
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <Header />
      <Panel navId={"orders-nav"} />
      <div className="content">
        {showModal && <div className="modal-backdrop fade show"></div>}
        {!(page === "order") ? (
          <>
            <Backpage handleOnBack={() => setPage("order")} />
            <OrderDetail />
          </>
        ) : (
            <>
              <button onClick={() => { setPage('detail-order')}}></button>
            <div className="mb-5">
              <div className="mb-4">
                <h2 className="fw-bold" style={{ color: "black" }}>
                  Quản lí đơn hàng
                </h2>
              </div>
              <ul className="nav nav-links mx-n3 mb-4 flex gap-4">
                <li
                  className="py-1 nav-item hover-nav nav-target"
                  data-status="all"
                >
                  <a
                    className="text-decoration-none fw-semibold"
                    data-status="all"
                    aria-current="page"
                    href="#"
                    onClick={changeNav}
                  >
                    <span>Tất cả</span>
                  </a>
                </li>
                <li className="nav-item py-1 hover-nav" data-status="checkout">
                  <a
                    className="text-decoration-none fw-semibold"
                    data-status="checkout"
                    aria-current="page"
                    href="#"
                    onClick={changeNav}
                  >
                    <span>Chờ thanh toán</span>
                  </a>
                </li>
                <li className="nav-item py-1 hover-nav" data-status="shipping">
                  <a
                    className="text-decoration-none fw-semibold target"
                    data-status="shipping"
                    aria-current="page"
                    href="#"
                    onClick={changeNav}
                  >
                    <span>Đang vận chuyển</span>
                  </a>
                </li>
                <li className="nav-item py-1 hover-nav" data-status="completed">
                  <a
                    className="text-decoration-none fw-semibold target"
                    data-status="completed"
                    aria-current="page"
                    href="#"
                    onClick={changeNav}
                  >
                    <span>Thành công (10) </span>
                  </a>
                </li>
              </ul>
              <div id="products">
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex gap-3">
                      <FormControl style={{ width: "700px" }}>
                        <FormLabel></FormLabel>
                        <Input
                          className="p-2 bg-white"
                          placeholder="Tìm kiếm mã đơn hàng, trạng thái, tên khách hàng,..."
                          startDecorator={<SearchIcon />}
                        />
                      </FormControl>
                    </div>
                    {/* <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        // onClick={handleRemoveSelectedBrands}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        // onClick={handleAddProduct}
                      >
                        <span className="fw-bold">+ </span>Thêm
                      </button>
                    </div> */}
                  </div>
                  <div className="dropdown-search d-none" id="dropdown-element">
                    <div className="dropdown-search-header">
                      <span>brands</span>
                      <button
                        type="button"
                        class="btn-close btn-close-white"
                        aria-label="Close"
                        // onClick={handleCloseSearch}
                      ></button>
                    </div>
                    <div id="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <ul className="nav p-3 row">
                        {searchResult.length == 0 ? (
                          <li className="nav-item pb-2 col-12 mb-2">
                            not found
                          </li>
                        ) : (
                          <>
                            {searchResult.map((item, index) => {
                              return (
                                <li className="nav-item pb-2 col-12 mb-2">
                                  <a className="d-flex gap-3 text-decoration-none text-reset">
                                    <img
                                      src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1731375811/brands/uqt9gebkizucgxlq71eh.jpg"
                                      width="70px"
                                      height="70px"
                                    ></img>
                                    <div>
                                      <span className="fw-bold">
                                        {item.name}
                                      </span>
                                      <p
                                        className="text-truncate"
                                        style={{ maxWidth: "400px" }}
                                      >
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                </li>
                              );
                            })}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  style={{ fontSize: "13px" }}
                  className="tablezone bg-white border-top border-bottom border-translucent position-relative top-1"
                >
                  <div className="table-responsive scrollbar">
                    <table className="table fs-9 mb-0">
                      <thead>
                        <tr className="" style={{ fontSize: "15px" }}>
                          <th
                            className="white-space-nowrap fs-9 align-middle pl-1 fw-semibold"
                            style={{ maxWidth: "20px", width: "18px" }}
                          >
                            <div className="form-check mb-0 fs-8">
                              <input
                                className="form-check-input"
                                id="checkbox-bulk-products-select"
                                type="checkbox"
                                data-bulk-select='{"body":"products-table-body"}'
                                // onClick={handleInputCheckAll}
                              />
                            </div>
                          </th>
                          <th
                            className="sort white-space-nowrap align-middle ps-4 fw-semibold"
                            scope="col"
                            style={{ width: "150px" }}
                            data-sort="brand"
                          >
                            Đơn hàng
                          </th>
                          <th
                            className="sort white-space-nowrap align-middle ps-1 fw-semibold"
                            scope="col"
                            style={{ width: "150px" }}
                            data-sort="brand"
                          >
                            Khách hàng
                          </th>
                          <th
                            className="sort text-end pe-4 fw-semibold"
                            scope="col"
                            data-sort="price"
                            style={{ width: "120px" }}
                          >
                            Trạng thái
                          </th>
                          <th
                            className="sort text-start fw-semibold"
                            scope="col"
                            data-sort="price"
                            style={{ width: "120px" }}
                          >
                            Thanh toán
                          </th>
                          <th
                            className="sort text-start fw-semibold"
                            scope="col"
                            data-sort="price"
                            style={{ width: "120px" }}
                          >
                            Thành tiền
                          </th>
                          <th
                            className="sort text-start fw-semibold"
                            scope="col"
                            style={{ width: "200px" }}
                          >
                            Thời gian hoàn thành
                          </th>
                          <th
                            className="sort fs-8 text-end fw-semibold"
                            scope="col"
                            style={{ width: "130px" }}
                          >
                            Ngày tạo
                          </th>
                          <th
                            className="sort text-end align-middle pe-0 ps-4"
                            scope="col"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="list" id="products-table-body">
                        {orders.map((order, index) => {
                          return (
                            <tr className="position-static">
                              <td className="fs-9 align-middle">
                                <div className="form-check mb-0 fs-8">
                                  <input
                                    value={order.id}
                                    className="form-check-input select-remove-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td className="product align-middle ps-4 fs-6 text-primary fw-semibold">
                                #{order.id}
                              </td>
                              <td className="product align-middle ps-1">
                                <a
                                  className="text-primary fw-semibold line-clamp-3 mb-0"
                                  href="#"
                                >
                                  { order.user.email }
                                </a>
                              </td>
                              <td className="align-middle white-space-nowrap pe-4 text-end flex justify-center">
                                <span className="badge bg-success text-red">
                                  Success
                                </span>
                              </td>

                              <td className="align-middle white-space-nowrap text-body-quaternary text-start">
                                <span className="badge bg-primary text-red">
                                  Paypal
                                </span>
                              </td>
                              <td className="align-middle white-space-nowrap text-body-quaternary text-start">
                                2.000.000 VND
                              </td>
                              <td className="text-body-quaternary text-start pt-4">
                                <div className="d-flex gap-2 flex-wrap">
                                  
                                </div>
                              </td>
                              <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 text-end">
                                {/* {formatTimeStamp(product.createdAt)} */}
                              </td>
                              <td>
                                <div className="d-flex gap-2 justify-content-center m-3">
                                  <button
                                    className="btn bg-transparent"
                                    // data-id={item.id}
                                    // onClick={handleRemoveBrand}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                      width="16"
                                      height="16"
                                      class="bi bi-pen"
                                    >
                                      <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="row align-items-center justify-content-between py-2 pe-0 fs-9">
                    <div className="col-auto d-flex align-items-center">
                      <p
                        className="mb-0 d-none d-sm-block me-3 fw-semibold text-body"
                        data-list-info="data-list-info"
                      >
                        {/* {(pagination.currentPage - 1) * pagination.pageSize + 1}{" "}
                        to {brands[pagination.currentPage - 1].length}{" "} */}
                        <span style={{ color: "gray", fontSize: "11px" }}>
                          Items of
                        </span>{" "}
                        {pagination.totalCount}
                      </p>
                    </div>
                    <div className="col-auto d-flex gap-2">
                      <button
                        className="page-link"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        data-list-pagination="prev"
                        onClick={handlePrevClick}
                      >
                        <svg
                          className="svg-inline--fa fa-chevron-left"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="chevron-left"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          fill="currentColor"
                          width="16px"
                          height="16px"
                        >
                          <path
                            fill="currentColor"
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                          ></path>
                        </svg>
                      </button>
                      <ul class="mb-0 pagination btn-group d-flex gap-1">
                        {paginationRange.map((pageNumber) => {
                          if (pageNumber === DOTS) {
                            return <li className="btn">&#8230;</li>;
                          }
                          return (
                            <li>
                              <button
                                className={
                                  pageNumber === pagination.currentPage
                                    ? "btn btn-primary"
                                    : "btn btn-outline-primary"
                                }
                                type="button"
                                data-page={pageNumber}
                                onClick={handleChangePage}
                              >
                                {pageNumber}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        className="p-0"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        data-list-pagination="next"
                        disabled=""
                        onClick={handleNextClick}
                      >
                        <svg
                          class="svg-inline--fa fa-chevron-right"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="chevron-right"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          fill="currentColor"
                          width="16px"
                          height="16px"
                        >
                          <path
                            fill="currentColor"
                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Orders;
