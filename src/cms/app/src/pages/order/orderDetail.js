import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { getBrand, updateLogoBrand, updateBrand } from "./../../helpers";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import Modal from "./../../components/modal/modal";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Autocomplete from "@mui/joy/Autocomplete";
import Button from "@mui/joy/Button";
import { FormControl, FormLabel, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function OrderDetail({ brandId }) {
  const editorRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [preview, setPreview] = useState({ pr: false, url: "" });
  const [upload, setUpload] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  // Init a category
  const [brand, setBrand] = useState({
    id: "",
    name: "",
    description: "",
    slug: "",
    logo: "",
    createdAt: "",
    updatedAt: "",
    productCount: 0,
  });

  useEffect(() => {
    // const fetchBrand = async () => {
    //   const result1 = await getBrand(brandId);
    //   setBrand(result1.data);
    //   console.log(result1.data);
    // };
    // fetchBrand();
  }, []);
  // Handle click on edit button
  const handleEdit = (event) => {
    event.preventDefault();
    setIsEdit(true);
  };

  // Handle click on cancel button
  const handleCancel = (event) => {
    event.preventDefault();
    setIsEdit(false);
  };

  // Handle change input name
  const handleChangeInputName = (event) => {
    let name = event.target.value;
    const slug = slugify(name, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
      trim: true, // Trim leading/trailing spaces
    });

    const slugInput = document.getElementById("slug-category");
    slugInput.value = slug;
  };

  // Handle update brand
  const handleUpdateBrand = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    let updateParams = {};
    let name = document.getElementById("name-category").value;
    if (name == "") {
      name = brand.name;
    }
    if (name != brand.name) {
      updateParams.name = name;
    }

    const slug = document.getElementById("slug-category").value;
    if (slug != brand.slug) {
      updateParams.slug = slug;
    }

    const description = editorRef.current.getContent({ format: "text" });
    if (description != brand.description) {
      updateParams.description = description;
    }

    const result = await updateBrand(brand.id, updateParams);
    setIsLoading(false);
    // Check if error
    if (result.status === 422) {
      const errors = result.response.data.errors;
      errors.forEach((err) => {
        if (err.source.pointer === "/name") {
          setModalContent({
            type: "error",
            title: "Lỗi",
            message:
              "Tên của thương hiệu đã tồn tại. Vui lòng chọn một tên khác",
          });
          setIsShowModal(true);
        } else {
          setModalContent({
            type: "error",
            title: "Lỗi",
            message:
              "Slug của thương hiệu đã tồn tại. Vui lòng chọn một slug khác",
          });
          setIsShowModal(true);
        }
      });
    } else {
      setBrand(result.data[0]);
      setModalContent({
        type: "success",
        title: "Thành công",
        message: "Thương hiệu đã được cập nhật!",
      });
      setIsShowModal(true);
      setIsEdit(false);
    }
  };

  // Close preview card
  const handleClosePreviewCard = () => {
    setPreview({ pr: false, url: "" });
  };

  // When drag file
  const handleOnDropFile = (acceptedFiles) => {
    let selectedFile = acceptedFiles[0];
    setPreview({ pr: true, url: URL.createObjectURL(selectedFile) });
    setUpload(selectedFile);
  };

  // Handle update image
  const handleEditUpload = () => {
    setIsUpload(true);
  };

  const handleCancelUpload = () => {
    setIsUpload(false);
  };

  const handleUploadLogoBrand = async (event) => {
    setIsLoadingUpload(true);
    event.preventDefault();

    const data = new FormData();
    data.append("file", upload);

    const result = await updateLogoBrand(brandId, data);
    setIsLoadingUpload(false);
    if (result.status == 422) {
      setModalContent({
        type: "error",
        title: "Lỗi",
        message: `${result.response.data.errors[0]}`,
      });
      setIsShowModal(true);
      setIsUpload(false);
      return;
    }
    setBrand(result.data[0]);
    setIsUpload(false);
    setModalContent({
      type: "success",
      title: "Thành công",
      message: `Hình ảnh được tải lên thành công!`,
    });
    setIsShowModal(true);
  };

  return (
    <>
      {isShowModal && (
        <Modal
          handleCloseModal={() => setIsShowModal(false)}
          message={modalContent.message}
          title={modalContent.title}
          type={modalContent.type}
        />
      )}
      <form className="add-product-content mb-9">
        {isShowModal && <div className="modal-backdrop fade show"></div>}
        <div className="d-flex justify-content-between mb-5">
          <div className="add-product-header-left">
            <h1 className="fw-bold" style={{ color: "#007bff" }}>
              Đơn hàng #123
            </h1>
          </div>
          {/* <div className="d-flex align-items-center gap-2">
            {!isEdit ? (
              <>
                <button
                  className="btn btn-primary d-flex gap-2 align-items-center"
                  onClick={handleEdit}
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
                  Chỉnh sửa
                </button>
              </>
            ) : (
              <>
                {isLoading ? (
                  <button
                    class="btn btn-primary d-flex gap-1 align-items-center"
                    type="button"
                    disabled
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Đang lưu...</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={handleUpdateBrand}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Hủy bỏ
                    </button>
                  </>
                )}
              </>
            )}
          </div> */}
        </div>
        <div className="row">
          <div className="col-8">
            <div className="reviews-container">
              <h2>Chi tiết đơn hàng</h2>
              <p>Payment received across all channels</p>
              <table className="reviews-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Khách hàng</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>Richard Dawkins</td>
                    <td>
                      <div className="rate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </div>
                    </td>
                    <td>This Fitbit is fantastic!...</td>
                    <td>
                      <span className="status approved">APPROVED</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-4">
            <div className="row g-2">
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title mb-4 fw-bold">Tổng kết</h4>
                    <div className="row gx-3">
                      <div className="row col-12">
                        <div className="col-6">
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                        </div>
                        <div className="col-6">
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                          <h6 className="mb-2 fw-semibold">Items subtotal</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {variants &&
                    variants.map((variant, index) => {
                        return (
                        <div className="card mb-3">
                            <div className="card-body">
                            <h4 className="card-title mb-4 fw-bold">
                                Variant {index + 1}
                                <button
                                className="btn btn-link text-decoration-none fw-semibold p-0 ms-3"
                                data-variant-index={index}
                                onClick={handleRemoveVariant}
                                >
                                Remove
                                </button>
                            </h4>
                            <div className="row gx-3">
                                {variant.options.map((option, optionIndex) => {
                                return (
                                    <div className="col-12">
                                    <div className="mb-4">
                                        <div className="d-flex flex-wrap mb-2">
                                        <h5 className="mb-0 me-2 fs-6 text-body-highlight fw-semibold">
                                            Lựa chọn {optionIndex + 1}
                                            <button
                                            className="btn btn-link text-decoration-none fw-semibold p-0 ms-2"
                                            style={{ fontSize: "11px" }}
                                            data-variant-index={index}
                                            data-option-index={optionIndex}
                                            onClick={handleRemoveOption}
                                            >
                                            Remove
                                            </button>
                                        </h5>
                                        </div>
                                        <select
                                        data-variant-index={index}
                                        data-option-index={optionIndex}
                                        className="form-select mb-3"
                                        onChange={handleOnChangeSelect}
                                        >
                                        <option value="none">-</option>
                                        {attributes.map((item, index) => (
                                            <option value={item.id}>
                                            {item.name}
                                            </option>
                                        ))}
                                        </select>
                                        <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        data-variant-index={index}
                                        data-option-index={optionIndex}
                                        onChange={handleOnChangeInput}
                                        rows="3"
                                        ></textarea>
                                    </div>
                                    </div>
                                );
                                })}
                            </div>
                            <button
                                type="button"
                                style={{ width: "100%" }}
                                className="btn btn-outline-primary"
                                data-variant-index={index}
                                onClick={handleAddOption}
                            >
                                Thêm lựa chọn khác
                            </button>
                            </div>
                        </div>
                        );
                    })} */}
                <button
                  className="btn btn-primary mb-5"
                  //   onClick={handleAddVariant}
                  style={{ width: "100%" }}
                >
                  Thêm variant
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default OrderDetail;
