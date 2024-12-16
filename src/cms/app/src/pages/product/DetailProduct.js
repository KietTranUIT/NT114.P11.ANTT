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

function DetailProduct({ brandId }) {
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
              Chi tiết sản phẩm
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
            <div
              className="bg-white ps-4 pt-4 pe-3 pb-2"
              style={{
                borderRadius: "15px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <div className="border-bottom mb-3 d-flex justify-content-between">
                <h3 className="mb-3 fw-semibold">General Information</h3>
                <div>
                  {isEdit ? (
                    <></>
                  ) : (
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
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <h6 className="mb-2 fw-semibold">Tên sản phẩm:</h6>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-3 p-2"
                    id="name-category"
                    data-name={brand.name}
                    placeholder={brand.name}
                    onChange={handleChangeInputName}
                  ></input>
                </>
              ) : (
                <input
                  type="text"
                  className="form-control mb-3 p-2"
                  id="name-category"
                ></input>
              )}
              <div className="row">
                <div className="col-6">
                  <h6 className="fw-semibold">Loại sản phẩm:</h6>
                  <select
                    className="form-select mb-3 p-2"
                    id="category-selects"
                  >
                    <option value="none">-</option>
                    {/* {categories.map((item, index) => (
                              <option value={item.id}>{item.name}</option>
                            ))} */}
                  </select>
                </div>
                <div className="col-6">
                  <h6 className="fw-semibold">Thương hiệu:</h6>
                  <select
                    className="form-select mb-3 p-2"
                    id="category-selects"
                  >
                    <option value="none">-</option>
                    {/* {categories.map((item, index) => (
                              <option value={item.id}>{item.name}</option>
                            ))} */}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h6 className="mb-2 fw-semibold">Slug:</h6>
                  <input
                    type="text"
                    className="form-control mb-3 p-2"
                    id="slug-category"
                    value={brand.slug}
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <h6 className="fw-semibold">Giá sản phẩm:</h6>
                  <input
                    type="text"
                    className="form-control mb-3 p-2"
                    id="slug-category"
                    value={brand.slug}
                    readOnly
                  ></input>
                </div>
                <div className="col-4">
                  <h6 className="fw-semibold">Sản phẩm trong kho</h6>
                  <input
                    type="number"
                    className="form-control mb-3 p-2"
                    id="slug-category"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <h6 className="fw-semibold">Giá khuyến mãi:</h6>
                  <input
                    type="text"
                    className="form-control mb-3 p-2"
                    id="slug-category"
                    value={brand.slug}
                    readOnly
                  ></input>
                </div>
                <div className="col-4">
                  <h6 className="fw-semibold">Ngày bắt đầu:</h6>
                  <input
                    type="date"
                    className="form-control mb-3 p-2"
                    id="slug-category"
                  ></input>
                </div>
                <div className="col-4">
                  <h6 className="fw-semibold">Ngày kết thúc:</h6>
                  <input
                    type="date"
                    className="form-control mb-3 p-2"
                    id="slug-category"
                  ></input>
                </div>
              </div>
              <div className="mb-3">
                <h6 className="mb-2 fw-semibold">Mô tả</h6>
                {isEdit ? (
                  <Editor
                    id="description-category"
                    apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={`<p>${brand.description}</p>`}
                    init={{
                      height: 300,
                      menubar: false,
                      resize: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                ) : (
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      value={brand.description}
                      readOnly
                    ></textarea>
                  </div>
                )}
              </div>
              {isEdit ? (
                <div className="d-flex gap-2 mb-2">
                  <button
                    className="btn btn-secondary d-flex gap-2 align-items-center"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary d-flex gap-2 align-items-center"
                    onClick={handleEdit}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            
          </div>
          <div className="col-4">
            <div className="row g-2">
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title mb-4 fw-bold">Tags</h4>
                    <div className="row gx-3">
                      <div className="col-12">
                        <div className="mb-4">
                          <Autocomplete
                            multiple
                            id="tags-default"
                            placeholder="Favorites"
                            options={["option1", "option2", "option3"]}
                            getOptionLabel={(option) => option}
                            defaultValue={["option1"]}
                            className="mb-3"
                            endDecorator={<Button>Add</Button>}
                          />
                          {/* <select className="form-select mb-3" id="tag-selects">
                            <option value="none">-</option>

                            {/* {tags.map((item, index) => (
                              <option
                                value={item.id}
                                data-tag-index={index}
                                onClick={handleAddSelectedTag}
                              >
                                + {item.name}
                              </option>
                            ))} */}
                          {/* </select> */}
                          <div className="show-selected-tags d-flex gap-2 flex-wrap">
                            {/* {selectedTags.map((tag) => {
                              return (
                                <div
                                  className="tag-items d-flex align-items-center p-1 gap-1"
                                  style={{
                                    backgroundColor: "#c7c7c7",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <span
                                    className="badge badge-primary pe-0 fw-semibold"
                                    style={{ color: "black" }}
                                  >
                                    {tag.name}
                                  </span>
                                  <a
                                    className="btn p-0 d-flex"
                                    href="#!"
                                    data-tag-index={tag.id}
                                    onClick={handleRemoveSelectedTag}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512"
                                      width="16px"
                                      height="16px"
                                      fill="black"
                                    >
                                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                  </a>
                                </div>
                              );
                            })} */}
                            <div
                              className="tag-items d-flex align-items-center p-1 gap-1"
                              style={{
                                backgroundColor: "#c7c7c7",
                                borderRadius: "5px",
                              }}
                            >
                              <span
                                className="badge badge-primary pe-0 fw-semibold"
                                style={{ color: "black" }}
                              >
                                demo
                              </span>
                              <a
                                className="btn p-0 d-flex"
                                href="#!"
                                // data-tag-index={tag.id}
                                // onClick={handleRemoveSelectedTag}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 384 512"
                                  width="16px"
                                  height="16px"
                                  fill="black"
                                >
                                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title mb-4 fw-bold">Options</h4>
                    <div className="row gx-3">
                      <div className="col-12">
                        <div className="mb-4">
                          <Autocomplete
                            multiple
                            id="tags-default"
                            placeholder="Favorites"
                            options={["option1", "option2", "option3"]}
                            getOptionLabel={(option) => option}
                            defaultValue={["option1"]}
                            className="mb-3"
                            endDecorator={<Button>Add</Button>}
                          />
                          {/* <select className="form-select mb-3" id="tag-selects">
                            <option value="none">-</option>

                            {/* {tags.map((item, index) => (
                              <option
                                value={item.id}
                                data-tag-index={index}
                                onClick={handleAddSelectedTag}
                              >
                                + {item.name}
                              </option>
                            ))} */}
                          {/* </select> */}
                          <div className="show-selected-tags d-flex gap-2 flex-wrap">
                            {/* {selectedTags.map((tag) => {
                              return (
                                <div
                                  className="tag-items d-flex align-items-center p-1 gap-1"
                                  style={{
                                    backgroundColor: "#c7c7c7",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <span
                                    className="badge badge-primary pe-0 fw-semibold"
                                    style={{ color: "black" }}
                                  >
                                    {tag.name}
                                  </span>
                                  <a
                                    className="btn p-0 d-flex"
                                    href="#!"
                                    data-tag-index={tag.id}
                                    onClick={handleRemoveSelectedTag}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512"
                                      width="16px"
                                      height="16px"
                                      fill="black"
                                    >
                                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                  </a>
                                </div>
                              );
                            })} */}
                            <div
                              className="tag-items d-flex align-items-center p-1 gap-1"
                              style={{
                                backgroundColor: "#c7c7c7",
                                borderRadius: "5px",
                              }}
                            >
                              <span
                                className="badge badge-primary pe-0 fw-semibold"
                                style={{ color: "black" }}
                              >
                                demo
                              </span>
                              <a
                                className="btn p-0 d-flex"
                                href="#!"
                                // data-tag-index={tag.id}
                                // onClick={handleRemoveSelectedTag}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 384 512"
                                  width="16px"
                                  height="16px"
                                  fill="black"
                                >
                                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                              </a>
                            </div>
                          </div>
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
          <div className="col-12 mb-4 mt-4">
          <div
              className="bg-white ps-4 pt-4 pe-3 pb-2"
              style={{
                borderRadius: "15px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <div className="border-bottom mb-3 d-flex justify-content-between">
                <h3 className="mb-3 fw-semibold">Media</h3>
              </div>
              <div className="mt-3 d-flex gap-4 mb-3 flex-wrap">
                <div className="dropzone-preview mb-2">
                  <div className="bg-white">
                    <img src={brand.logo} width="170px" height="170px"></img>
                  </div>
                </div>
                <div className="dropzone-preview mb-2">
                  <div className="bg-white">
                    <img src={brand.logo} width="170px" height="170px"></img>
                  </div>
                </div>
                <div
                  className="dropzone mb-3 ms-3"
                  style={{ width: "150px", height: "150px" }}
                >
                  {/* <div
                    // className={
                    //   preview.pr
                    //     ? "dropzone-preview mb-2"
                    //     : "dropzone-preview mb-2 d-none"
                    // }
                  >
                    <div className="preview-card p-4 bg-white">
                      <img src={preview.url} width="60px" height="60px"></img>
                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        style={{
                          position: "absolute",
                          right: "0",
                          top: "0",
                          width: "7px",
                          height: "7px",
                        }}
                        onClick={handleClosePreviewCard}
                      ></button>
                    </div>
                  </div> */}
                  <Dropzone
                    onDrop={handleOnDropFile}
                    multiple={false}
                    accept={"image/png"}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="row">
                          <div className="dropzone-items col-12 p-4 d-flex flex-column align-items-center gap-2">
                            <div className="d-flex justify-content-center align-items-center flex-column">
                              <div className="d-flex justify-content-center gap-2">
                                <a className="text-decoration-none btn btn-link p-0">
                                  Add image
                                </a>
                              </div>
                              <input {...getInputProps()} />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                width="60px"
                                height="60px"
                                opacity={0.7}
                              >
                                <path d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bg-white pt-4 mb-5" style={{borderRadius:"15px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
              <div className="mb-4">
                <div className="border-bottom mb-4">
                    <h3 className="fw-semibold">Variants</h3>
                </div>
                <div className="d-flex justify-content-between">
                  {/* <div className="search-box">
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
                              placeholder="Tìm kiếm sản phẩm"
                              onChange={handleSearchChange}
                            />
                          </div>
                        </div>
                      </form>
                    </div> */}
                  <div className="d-flex gap-3">
                    <FormControl>
                      <FormLabel>Search</FormLabel>
                      <Input
                        placeholder="Tìm kiếm sản phẩm"
                        startDecorator={<SearchIcon />}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Autocomplete
                        placeholder="Filter by status"
                        options={["option1", "option2"]}
                        sx={{ width: 150 }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Autocomplete
                        placeholder="All"
                        options={["option1", "option2"]}
                        sx={{ width: 150 }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Brand</FormLabel>
                      <Autocomplete
                        placeholder="All"
                        options={["option1", "option2"]}
                        sx={{ width: 150 }}
                      />
                    </FormControl>
                  </div>
                  <div className="d-flex gap-2">
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
                  </div>
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
                    {/* <ul className="nav p-3 row">
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
                      </ul> */}
                  </div>
                </div>
              </div>
              <div
                style={{ fontSize: "13px" }}
                className="mb-3 bg-white border-top border-bottom border-translucent position-relative top-1"
              >
                <div className="table-responsive scrollbar">
                  <table className="table fs-9 mb-0">
                    <thead>
                      <tr className="" style={{ fontSize: "15px" }}>
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
                              // onClick={handleInputCheckAll}
                            />
                          </div>
                        </th>
                        <th
                          className="sort white-space-nowrap align-middle ps-4"
                          scope="col"
                          style={{ width: "150px" }}
                          data-sort="brand"
                        ></th>
                        <th
                          className="sort white-space-nowrap align-middle ps-1"
                          scope="col"
                          style={{ width: "150px" }}
                          data-sort="brand"
                        >
                          Product Name
                          <a
                          //   onClick={(event) => {
                          //     event.preventDefault();
                          //     let copy = brands;
                          //     copy[pagination.currentPage - 1].sort((a, b) =>
                          //       a.name.localeCompare(b.name)
                          //     );
                          //     setBrands(copy);
                          //     console.log(copy);
                          //   }}
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
                          className="sort text-end pe-4"
                          scope="col"
                          data-sort="price"
                          style={{ width: "120px" }}
                        >
                          Price
                        </th>
                        <th
                          className="sort text-start"
                          scope="col"
                          data-sort="price"
                          style={{ width: "120px" }}
                        >
                          Category
                        </th>
                        <th
                          className="sort text-start"
                          scope="col"
                          data-sort="price"
                          style={{ width: "120px" }}
                        >
                          Brand
                        </th>
                        <th
                          className="sort text-start"
                          scope="col"
                          style={{ width: "170px" }}
                        >
                          Tags
                        </th>
                        <th
                          className="sort fs-8 text-end"
                          scope="col"
                          style={{ width: "130px" }}
                        >
                          Published On
                        </th>
                        <th
                          className="sort text-end align-middle pe-0 ps-4"
                          scope="col"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="list" id="products-table-body">
                      {/* {products[pagination.currentPage - 1].map(
                          (product, index) => (
                            <tr className="position-static">
                              <td className="fs-9 align-middle">
                                <div className="form-check mb-0 fs-8">
                                  <input
                                    value={product.id}
                                    className="form-check-input select-remove-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td className="product align-middle ps-4">
                                <img
                                  className="p-2 border"
                                  src={product.product_medias.map(
                                    (media_item) => {
                                      if (media_item.isMain == true) {
                                        return media_item.url;
                                      }
                                    }
                                  )}
                                  alt="error!"
                                  width="90px"
                                  height="90px"
                                ></img>
                              </td>
                              <td className="product align-middle ps-1">
                                <a
                                  className="fw-semibold line-clamp-3 mb-0"
                                  href="../../../apps/e-commerce/landing/product-details.html"
                                >
                                  {product.name}
                                </a>
                              </td>
                              <td className="align-middle white-space-nowrap text-body-quaternary pe-4 text-end">
                                {formatToVNDCustom(product.regularPrice)}
                              </td>
                              <td className="align-middle white-space-nowrap text-body-quaternary text-start">
                                {product.category === null ? (
                                  <></>
                                ) : (
                                  product.category.name
                                )}
                              </td>
                              <td className="align-middle white-space-nowrap text-body-quaternary text-start">
                                {product.brand === null ? (
                                  <></>
                                ) : (
                                  product.brand.name
                                )}
                              </td>
                              <td className="text-body-quaternary text-start pt-4">
                                <div className="d-flex gap-2 flex-wrap">
                                  {product.tags_detail.map((tag) => {
                                    return (
                                      <div
                                        className="tag-items d-flex align-items-center p-1 gap-1"
                                        style={{
                                          backgroundColor: "#c7c7c7",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <span
                                          className="badge badge-primary fw-semibold"
                                          style={{ color: "black" }}
                                        >
                                          { tag.name }
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </td>
                              <td className="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 text-end">
                                {formatTimeStamp(product.createdAt)}
                              </td>
                              <td>
                                <div className="d-flex gap-2 justify-content-center m-3">
                                  <button
                                    className="btn btn-primary"
                                    data-id={product.id}
                                    onClick={handleEditProduct}
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
                                    // data-id={item.id}
                                    // onClick={handleRemoveBrand}
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
                        )} */}
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
                      {/* {pagination.totalCount} */}
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
                      // onClick={handlePrevClick}
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
                    {/* <ul class="mb-0 pagination btn-group d-flex gap-1">
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
                      </ul> */}
                    <button
                      className="p-0"
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      data-list-pagination="next"
                      disabled=""
                      // onClick={handleNextClick}
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
      </form>
    </>
  );
}

export default DetailProduct;
