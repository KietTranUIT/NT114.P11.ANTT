import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect } from "react";
import {
  formatTimeStamp,
  deleteBrand,
  deleteBrands,
  searchBrand,
  getBrands,
  getTotalBrands,
} from "./../../helpers";
import { useNavigate } from "react-router-dom";
import { debounce, set } from "lodash";
import AddBrand from "./AddBrand";
import DetailBrand from "./DetailBrand";
import { usePagination, DOTS } from "../../helpers/pagination";
import "./brands.css";
import Loading from "../../components/loading/loading";
import Modal from "../../components/modal/modal";
import Backpage from "../../components/backpage/backpage";

function Brands() {
  const [brands, setBrands] = useState([[]]);
  const [page, setPage] = useState("brand");
  const [searchResult, setSearchResult] = useState([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 20,
  });
  const [indexBrand, setIndexBrand] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "",
    title: "",
    message: "",
  });

  let paginationRange = usePagination(pagination);

  // Loading list brands access page
  useEffect(() => {
    // Fetch brands
    const fetchBrands = async () => {
      // Get total brands
      const result1 = await getTotalBrands();
      setPagination({ ...pagination, totalCount: result1.total });

      const totalPageNumbers = Math.ceil(result1.total / pagination.pageSize);

      const initBrands = [];
      for (let i = 0; i < totalPageNumbers; i++) {
        initBrands.push([]);
      }

      const result = await getBrands({
        page: pagination.currentPage,
        limit: pagination.pageSize,
      });
      initBrands[pagination.currentPage - 1] = result.data;
      return initBrands;
    };
    fetchBrands().then((data) => {
      setBrands(data);
      setIsLoading(false);
    });
  }, []);

  // Navigate to add brand page when click
  const handleAddBrand = () => {
    setPage("addbrand");
  };

  // Handle click on edit category
  const handleEditBrand = (event) => {
    const brandId = event.currentTarget.dataset.id;
    setIndexBrand(brandId);
    setPage("detailbrand");
  };

  // Handle click on remove brand
  const handleRemoveBrand = async (event) => {
    const brandId = event.currentTarget.dataset.id;

    // remove brand api
    const result = await deleteBrand(brandId);
    if (result.status != 200) {
      setModalContent({
        type: "error",
        title: "Lỗi",
        message: `${result.response.data.errors[0].detail}`,
      });
      setShowModal(true);
    } else {
      setModalContent({
        type: "success",
        title: "Thành công",
        message: `Thương hiệu #${brandId} đã xóa thành công!`,
      });
      setShowModal(true);
    }
  };

  // Handle remove selected brands
  const handleRemoveSelectedBrands = async (event) => {
    event.preventDefault();

    const inputs = document.getElementsByClassName("select-remove-input");
    let selected = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        selected.push(inputs[i].value);
      }
    }
    if (selected.length <= 0) {
      alert("Please select a brand to delete");
    } else {
      const result = await deleteBrands(selected);
      if (result.status == 200) {
        setModalContent({
          type: "success",
          title: "Thành công",
          message: `Đã xóa thành công!`,
        });
        setShowModal(true);
      } else {
        setModalContent({
          type: "error",
          title: "Lỗi",
          message: `${result.response.data.errors[0].detail}`,
        });
        setShowModal(true);
      }
    }
  };

  // Handle click on input check all
  const handleInputCheckAll = (event) => {
    const inputs = document.getElementsByClassName("select-remove-input");

    if (event.currentTarget.checked) {
      for (const input of inputs) {
        input.checked = true;
      }
      return;
    }
    for (const input of inputs) {
      input.checked = false;
    }
  };

  const handleSearch = async (query) => {
    const result = await searchBrand(query);
    if (!(result instanceof Error)) {
      if (result.data.length <= 0) {
        setSearchResult([]);
      } else {
        setSearchResult(result.data);
      }
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  // Search category
  const handleSearchChange = (event) => {
    const dropdown = document.getElementById("dropdown-element");
    dropdown.classList.remove("d-none");
    debouncedSearch(event.target.value);
  };

  // Handle on change page
  const handleChangePage = async (event) => {
    const pageNumber = parseInt(event.currentTarget.dataset.page);
    if (brands[pageNumber - 1].length == 0) {
      // Fetch brands
      const result = await getBrands({
        page: pageNumber,
        limit: pagination.pageSize,
      });
      let copyBrands = brands;
      copyBrands[pageNumber - 1] = result.data;
      setBrands((brds) => copyBrands);
    }

    setPagination({ ...pagination, currentPage: pageNumber });
  };

  // Close result search
  const handleCloseSearch = (event) => {
    const dropdown = document.getElementById("dropdown-element");
    dropdown.classList.add("d-none");

    const searchInput = document.getElementById("search-input");
    searchInput.value = "";
  };

  // On click previous
  const handlePrevClick = async (event) => {
    const pageNumber = pagination.currentPage - 1;
    if (pageNumber <= 0) {
      return;
    }

    if (brands[pageNumber - 1].length == 0) {
      // Fetch brands
      const result = await getBrands({
        page: pageNumber,
        limit: pagination.pageSize,
      });
      let copyBrands = brands;
      copyBrands[pageNumber - 1] = result.data;
      setBrands((brds) => copyBrands);
    }
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  // On click next
  const handleNextClick = async (event) => {
    const totalPageNumbers = Math.ceil(
      pagination.totalCount / pagination.pageSize
    );
    const pageNumber = pagination.currentPage + 1;
    if (pageNumber > totalPageNumbers) {
      return;
    }

    if (brands[pageNumber - 1].length == 0) {
      // Fetch brands
      const result = await getBrands({
        page: pageNumber,
        limit: pagination.pageSize,
      });
      let copyBrands = brands;
      copyBrands[pageNumber - 1] = result.data;
      setBrands((brds) => copyBrands);
    }
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {showModal && (
            <Modal
              handleCloseModal={() => setShowModal(false)}
              message={modalContent.message}
              title={modalContent.title}
              type={modalContent.type}
            />
          )}
          <Header />
          <Panel navId={"brands-nav"} />
          <div className="content">
            {showModal && <div className="modal-backdrop fade show"></div>}
            {!(page === "brand") ? (
              <>
                <Backpage handleOnBack={() => setPage("brand")} />

                {page === "addbrand" ? (
                  <AddBrand />
                ) : (
                  <DetailBrand brandId={indexBrand} />
                )}
              </>
            ) : (
              <>
                <div className="mb-5">
                  <div className="mb-4">
                    <h2 className="fw-bold" style={{ color: "#007bff" }}>
                      Thương hiệu
                    </h2>
                  </div>
                  <ul className="nav nav-links mx-n3 mb-3">
                    <li className="nav-item">
                      <a
                        className="pl-0 text-decoration-none text-dark fw-semibold"
                        style={{ fontSize: "13px" }}
                        aria-current="page"
                        href="#"
                      >
                        <span style={{ color: "#0d6efd" }}>Tất cả </span>
                        <span style={{ color: "#0d6efd" }}>
                          ({pagination.totalCount})
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div id="products">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <div className="search-box">
                          <form id="form1">
                            <div className="input-group d-flex flex-column">
                              <div className="d-flex align-items-center position-relative">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  width="16px"
                                  height="16px"
                                  className="position-absolute ms-3"
                                >
                                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                                <input
                                  type="search"
                                  id="search-input"
                                  className="form-control"
                                  placeholder="Tìm kiếm thương hiệu"
                                  onChange={handleSearchChange}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleRemoveSelectedBrands}
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
                            onClick={handleAddBrand}
                          >
                            <span className="fw-bold">+ </span>Thêm
                          </button>
                        </div>
                      </div>
                      <div
                        className="dropdown-search d-none"
                        id="dropdown-element"
                      >
                        <div className="dropdown-search-header">
                          <span>brands</span>
                          <button
                            type="button"
                            class="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={handleCloseSearch}
                          ></button>
                        </div>
                        <div
                          id="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
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
                            <tr className="" style={{ fontSize: "13px" }}>
                              <th
                                className="white-space-nowrap fs-9 align-middle pl-1"
                                style={{ maxWidth: "20px", width: "18px" }}
                              >
                                <div className="form-check mb-0 fs-8">
                                  <input
                                    className="form-check-input"
                                    id="checkbox-bulk-products-select"
                                    type="checkbox"
                                    data-bulk-select='{"body":"products-table-body"}'
                                    onClick={handleInputCheckAll}
                                  />
                                </div>
                              </th>
                              <th
                                className="sort white-space-nowrap align-middle ps-4"
                                scope="col"
                                style={{ width: "150px" }}
                                data-sort="brand"
                              >
                                TÊN
                                <a
                                  onClick={(event) => {
                                    console.log(brands);
                                    event.preventDefault();
                                    let copy = brands;
                                    copy[pagination.currentPage - 1].sort(
                                      (a, b) => a.name.localeCompare(b.name)
                                    );
                                    setBrands(copy);
                                    console.log(copy);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    fill="gray"
                                    width="12px"
                                    height="12px"
                                    className="ms-1 mb-1"
                                  >
                                    <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                                  </svg>
                                </a>
                              </th>
                              <th
                                className="sort white-space-nowrap align-middle ps-4"
                                scope="col"
                                style={{ width: "150px" }}
                                data-sort="brand"
                              >
                                LOGO
                              </th>
                              <th
                                className="sort"
                                scope="col"
                                data-sort="price"
                                style={{ width: "395px" }}
                              >
                                MÔ TẢ
                              </th>
                              <th
                                className="sort"
                                scope="col"
                                data-sort="tags"
                                style={{ width: "155px" }}
                              >
                                NGÀY CHỈNH SỬA
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 320 512"
                                  fill="gray"
                                  width="12px"
                                  height="12px"
                                  className="ms-1 mb-1"
                                >
                                  <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                                </svg>
                              </th>
                              <th
                                className="sort fs-8"
                                scope="col"
                                style={{ width: "155px" }}
                              >
                                NGÀY TẠO
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 320 512"
                                  fill="gray"
                                  width="12px"
                                  height="12px"
                                  className="ms-1 mb-1"
                                >
                                  <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                                </svg>
                              </th>
                              <th
                                className="sort text-end align-middle pe-0 ps-4"
                                scope="col"
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="list" id="products-table-body">
                            {brands[pagination.currentPage - 1].map(
                              (item, index) => (
                                <tr className="position-static">
                                  <td className="fs-9 align-middle">
                                    <div className="form-check mb-0 fs-8">
                                      <input
                                        value={item.id}
                                        className="form-check-input select-remove-input"
                                        type="checkbox"
                                        data-bulk-select-row='{"product":"Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp; L Bands...","productImage":"/products/1.png","price":"$39","category":"Plants","tags":["Health","Exercise","Discipline","Lifestyle","Fitness"],"star":false,"vendor":"Blue Olive Plant sellers. Inc","publishedOn":"Nov 12, 10:45 PM"}'
                                      />
                                    </div>
                                  </td>
                                  <td className="product align-middle ps-4">
                                    <a
                                      className="fw-semibold line-clamp-3 mb-0"
                                      href="../../../apps/e-commerce/landing/product-details.html"
                                    >
                                      {item.name}
                                    </a>
                                  </td>
                                  <td className="product align-middle ps-4">
                                    <img
                                      className="p-2 border"
                                      src={item.logo}
                                      alt="error!"
                                      width="90px"
                                      height="90px"
                                    ></img>
                                  </td>
                                  <td className="align-middle white-space-nowrap text-body-quaternary fs-9 fw-semibold">
                                    {item.description}
                                  </td>
                                  <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85">
                                    {formatTimeStamp(item.updatedAt)}
                                  </td>
                                  <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85">
                                    {formatTimeStamp(item.createdAt)}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-2 justify-content-center m-3">
                                      <button
                                        className="btn btn-primary"
                                        data-id={item.id}
                                        onClick={handleEditBrand}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-pen"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                        </svg>
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        data-id={item.id}
                                        onClick={handleRemoveBrand}
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
                                    </div>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="row align-items-center justify-content-between py-2 pe-0 fs-9">
                        <div className="col-auto d-flex align-items-center">
                          <p
                            className="mb-0 d-none d-sm-block me-3 fw-semibold text-body"
                            data-list-info="data-list-info"
                          >
                            {(pagination.currentPage - 1) *
                              pagination.pageSize +
                              1}{" "}
                            to {brands[pagination.currentPage - 1].length}{" "}
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
      )}
    </>
  );
}

export default Brands;
