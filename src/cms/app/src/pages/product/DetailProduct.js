import Panel from "./../../components/panel/Panel";
import Header from "./../../components/header/Header";
import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import {
  getBrand,
  updateLogoBrand,
  updateBrand,
  getDetailProduct,
  formatToVNDCustom,
  uploadImage,
  deleteImage,
  getCategories,
  getTags,
  getBrandsV2,
  updateProduct,
} from "./../../helpers";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import Modal from "./../../components/modal/modal";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Autocomplete from "@mui/joy/Autocomplete";
import Button from "@mui/joy/Button";
import { FormControl, FormLabel, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./listproduct.css";
import { usePagination, DOTS } from "../../helpers/pagination";

function DetailProduct({ productId }) {
  const editorRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDiscountEdit, setIsDiscountEdit] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [preview, setPreview] = useState({ pr: false, url: "" });
  const [upload, setUpload] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalContent, setModalContent] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [count, setCount] = useState(0);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    slug: "",
    logo: "",
    createdAt: "",
    updatedAt: "",
    productCount: 0,
    regularPrice: "",
    quantity: "",
    category: {
      name: "",
      id: "",
    },
    brand: {
      name: "",
      id: "",
    },
    product_medias: [],
    tags_detail: [],
    type_discount: "",
    discount: 0,
    startSale: "01-01-2025",
    endSale: "01-01-2025",
    product_reviews: [],
    rating: 0,
  });
  const [pagination, setPagination] = useState({
    totalCount: 0,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 20,
  });
  let paginationRange = usePagination(pagination);

  useEffect(() => {
    const fetchData = async () => {
      let httpRes = await getCategories();
      setCategories(httpRes.data);

      httpRes = await getTags();
      setTags(httpRes.data);

      httpRes = await getBrandsV2();
      setBrands(httpRes.data);
    };
    fetchData();
  }, []);
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

  useEffect(() => {
    const fetchBrand = async () => {
      const result1 = await getDetailProduct({ id: productId });
      setProduct(result1.data);
    };
    fetchBrand();
  }, [count]);
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

  // Handle add tag to product
  const handleAddTagProduct = async (event) => {
    let tags = selectedTags.map((data) => {
      return { productId, tagId: data.id };
    });
    const httpRes = await updateProduct(productId, { tags, tag_type: "add" });
    setProduct(httpRes.data);
    setSelectedTags([]);
  };

  // Delete image
  const onDeleteImage = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.imageId;
    await deleteImage(id);
    setCount(count + 1);
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
  const handleUpdateProduct = async (event) => {
    // setIsLoading(true);
    event.preventDefault();
    let updateParams = {};
    let name = document.getElementById("name-product").value;
    if (name == "") {
      name = product.name;
    }
    if (name != product.name) {
      updateParams.name = name;
    }
    const slug = document.getElementById("slug-product").value;
    if (slug != product.slug) {
      updateParams.slug = slug;
    }

    const regularPrice = document.getElementById("price-product").value;
    if (regularPrice != product.regularPrice && regularPrice != "") {
      updateParams.regularPrice = regularPrice;
    }

    const stock = document.getElementById("stock-product").value;
    if (stock != product.stock) {
      updateParams.stock = stock;
    }

    const description = editorRef.current.getContent({ format: "text" });
    if (description != product.description) {
      updateParams.description = description;
    }

    const result = await updateProduct(product.id, updateParams);
    setIsLoading(false);
    // Check if error
    if (result.status === 422) {
      const errors = result.response.data.errors;
      errors.forEach((err) => {
        if (err.source.pointer === "/name") {
          setModalContent({
            type: "error",
            title: "Lỗi",
            message: "Tên sản phẩm đã tồn tại.",
          });
          setIsShowModal(true);
        } else {
          setModalContent({
            type: "error",
            title: "Lỗi",
            message: "Slug sản phẩm đã tồn tại",
          });
          setIsShowModal(true);
        }
      });
    } else {
      console.log(result);
      setProduct(result.data);
      setModalContent({
        type: "success",
        title: "Thành công",
        message: "Sản phẩm đã được cập nhật!",
      });
      setIsShowModal(true);
      setIsEdit(false);
    }
  };
  const handleUpdateDiscount = async (event) => {
    // setIsLoading(true);
    event.preventDefault();
    let updateParams = {};
    let type_discount = document.getElementById("type-discount-product").value;

    const discount = document.getElementById("discount-value-product").value;

    const startSale = document.getElementById("startSale-product").value;
    const endSale = document.getElementById("endSale-product").value;
    updateParams = { type_discount, discount, startSale, endSale };

    const result = await updateProduct(product.id, updateParams);
    setIsLoading(false);
    // Check if error
    if (result.status === 422) {
      const errors = result.response.data.errors;
      errors.forEach((err) => {
        if (err.source.pointer === "/name") {
          setModalContent({
            type: "error",
            title: "Lỗi",
            message: "Tên sản phẩm đã tồn tại.",
          });
          setIsShowModal(true);
        } else {
          setModalContent({
            type: "error",
            title: "Lỗi",
            message: "Slug sản phẩm đã tồn tại",
          });
          setIsShowModal(true);
        }
      });
    } else {
      console.log(result);
      setProduct(result.data);
      setModalContent({
        type: "success",
        title: "Thành công",
        message: "Sản phẩm đã được cập nhật!",
      });
      setIsShowModal(true);
      setIsDiscountEdit(false);
    }
  };

  // Close preview card
  const handleClosePreviewCard = () => {
    setPreview({ pr: false, url: "" });
  };

  // When drag file
  const handleOnDropFile = async (acceptedFiles) => {
    let data = new FormData();
    data.append("product", productId);
    acceptedFiles.forEach((file) => {
      data.append("file", file);
    });
    const httpRes = await uploadImage(data);
    // if (httpRes.status != 201) {
    //   alert("Thêm hình ảnh thất bại!");
    //   return;
    // }
    // setPreview({ pr: true, url: URL.createObjectURL(selectedFile) });
    // setUpload(selectedFile);
    setCount(count + 1);
  };

  // Handle update image
  const handleEditUpload = () => {
    setIsUpload(true);
  };

  const handleCancelUpload = () => {
    setIsUpload(false);
  };

  const handleChange = (event, value) => {
    setSelectedTags(value); // Lưu danh sách các tag đã chọn
    console.log("Selected Tags:", value); // In ra danh sách đã chọn
  };

  const filterTag = () => {
    let t = tags.filter((tag) => {
      let flag = false;
      product.tags_detail.forEach((tp) => {
        if (tp.id === tag.id) {
          flag = true;
          return;
        }
      });
      if (!flag) {
        return tag;
      }
    });
    console.log("day chinh la demo ", t);
    return t;
  };

  const handleUploadLogoBrand = async (event) => {
    // setIsLoadingUpload(true);
    // event.preventDefault();
    // const data = new FormData();
    // data.append("file", upload);
    // const result = await updateLogoBrand(brandId, data);
    // setIsLoadingUpload(false);
    // if (result.status == 422) {
    //   setModalContent({
    //     type: "error",
    //     title: "Lỗi",
    //     message: `${result.response.data.errors[0]}`,
    //   });
    //   setIsShowModal(true);
    //   setIsUpload(false);
    //   return;
    // }
    // setBrand(result.data[0]);
    // setIsUpload(false);
    // setModalContent({
    //   type: "success",
    //   title: "Thành công",
    //   message: `Hình ảnh được tải lên thành công!`,
    // });
    // setIsShowModal(true);
  };
  const handleRemoveSelectedTag = async (event) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.tagIndex;
    const httpRes = await updateProduct(productId, {
      tag_type: "delete",
      tags: id,
    });
    setProduct(httpRes.data);
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
            <h1 className="fw-bold" style={{ color: "black" }}>
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
                <h3 className="mb-3 fw-semibold">
                  
                </h3>
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
                    id="name-product"
                    data-name={product.name}
                    placeholder={product.name}
                    onChange={handleChangeInputName}
                  ></input>
                </>
              ) : (
                <input
                  type="text"
                  className="form-control mb-3 p-2"
                  id="name-product"
                  value={product.name}
                ></input>
              )}
              <div className="row">
                <div className="col-6">
                  <h6 className="fw-semibold">Loại sản phẩm:</h6>
                  <select
                    className="form-select mb-3 p-2"
                    id="category-selects"
                  >
                    <option value={product.category.id}>
                      {product.category.name}
                    </option>
                    {isEdit ? (
                      <>
                        {categories.map((category, index) => {
                          if (category.id != product.category.id) {
                            return (
                              <option value={category.id}>
                                {category.name}
                              </option>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <></>
                    )}
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
                    <option value={ product.brand === null ? (0):(product.brand.id)}>
                      { product.brand === null ? (''):(product.brand.name)}
                    </option>
                    {isEdit ? (
                      <>
                        {brands.map((brand, index) => {
                          if (product.brand.id != brand.id) {
                            return (
                              <option value={brand.id}>{brand.name}</option>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <></>
                    )}
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
                    id="slug-product"
                    value={product.slug}
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <h6 className="fw-semibold">Giá sản phẩm:</h6>
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-3 p-2"
                        id="price-product"
                        placeholder={formatToVNDCustom(product.regularPrice)}
                      ></input>
                    </>
                  ) : (
                    <input
                      type="text"
                      className="form-control mb-3 p-2"
                      id="price-product"
                      value={formatToVNDCustom(product.regularPrice)}
                      readOnly
                    ></input>
                  )}
                </div>
                <div className="col-4">
                  <h6 className="fw-semibold">Sản phẩm trong kho</h6>
                  {isEdit ? (
                    <input
                      type="number"
                      className="form-control mb-3 p-2"
                      id="stock-product"
                      placeholder={product.stock}
                    ></input>
                  ) : (
                    <input
                      type="number"
                      className="form-control mb-3 p-2"
                      id="stock-product"
                      value={product.stock}
                      readOnly
                    ></input>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <h6 className="mb-2 fw-semibold">Mô tả</h6>
                {isEdit ? (
                  <Editor
                    id="description-product"
                    apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={`<p>${product.description}</p>`}
                    init={{
                      height: 400,
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
                      rows="15"
                      value={product.description}
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
                    onClick={handleUpdateProduct}
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
                            placeholder="Tags"
                            options={filterTag()}
                            getOptionLabel={(option) => option.name}
                            defaultValue={tags[0]}
                            className="mb-3"
                            endDecorator={
                              <Button onClick={handleAddTagProduct}>Add</Button>
                            }
                            onChange={handleChange}
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
                                    {tag.name}
                                  </span>
                                  <a
                                    className="btn p-0 d-flex"
                                    href="#!"
                                    data-tag-index={tag.product_tags.id}
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
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title mb-4 fw-bold">
                      Khuyến mãi
                      {product.startSale != null &&
                      product.endSale != null &&
                      new Date() > new Date(product.startSale) &&
                      new Date() < new Date(product.endSale) ? (
                        <span
                          style={{
                            color: "red",
                            fontSize: "11px",
                            marginLeft: "5px",
                          }}
                        >
                          Sản phẩm đang khuyến mãi
                        </span>
                      ) : (
                        <>
                          <span
                            style={{
                              color: "gray",
                              fontSize: "11px",
                              marginLeft: "5px",
                            }}
                          >
                            Sản phẩm chưa có khuyến mãi
                          </span>
                        </>
                      )}
                    </h4>
                    <div className="row gx-3">
                      <div className="col-12">
                        <div className="mb-4">
                          <h6>Kiểu khuyến mãi</h6>
                          <select
                            className="form-select mb-3"
                            id="type-discount-product"
                          >
                            {product.type_discount === "percent" ? (
                              <>
                                <option value="percent" selected>
                                  Phần trăm
                                </option>
                                <option value="fixed">Giá cố định</option>
                              </>
                            ) : (
                              <>
                                <option value="percent">Phần trăm</option>
                                <option value="fixed" selected>
                                  Giá cố định
                                </option>
                              </>
                            )}
                          </select>
                          <h6>Giá trị khuyến mãi</h6>
                          {isDiscountEdit ? (
                            <input
                              type="text"
                              className="form-control mb-3 p-2"
                              id="discount-value-product"
                              placeholder={product.discount}
                            ></input>
                          ) : (
                            <input
                              type="text"
                              className="form-control mb-3 p-2"
                              id="discount-value-product"
                              value={product.discount}
                              readOnly
                            ></input>
                          )}
                          <div className="row">
                            <div className="col-6">
                              {" "}
                              <h6 className="fw-semibold">Ngày bắt đầu:</h6>
                              {isDiscountEdit ? (
                                <>
                                  <input
                                    type="date"
                                    className="form-control mb-3 p-2"
                                    id="startSale-product"
                                    placeholder={formatDateToDDMMYY(
                                      product.startSale
                                    )}
                                  ></input>
                                </>
                              ) : (
                                <>
                                  <input
                                    type="date"
                                    className="form-control mb-3 p-2"
                                    id="startSale-product"
                                    value={formatDateToDDMMYY(
                                      product.startSale
                                    )}
                                    readOnly
                                  ></input>
                                </>
                              )}
                            </div>
                            <div className="col-6">
                              <h6 className="fw-semibold">Ngày kết thúc:</h6>
                              {isDiscountEdit ? (
                                <>
                                  <input
                                    type="date"
                                    className="form-control mb-3 p-2"
                                    id="endSale-product"
                                    placeholder={formatDateToDDMMYY(
                                      product.endSale
                                    )}
                                  ></input>
                                </>
                              ) : (
                                <>
                                  <input
                                    type="date"
                                    className="form-control mb-3 p-2"
                                    id="endSale-product"
                                    value={formatDateToDDMMYY(product.endSale)}
                                    readOnly
                                  ></input>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isDiscountEdit ? (
                      <div className="d-flex gap-2 mb-2">
                        <button
                          className="btn btn-secondary d-flex gap-2 align-items-center"
                          onClick={() => {
                            setIsDiscountEdit(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary d-flex gap-2 align-items-center"
                          onClick={handleUpdateDiscount}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary d-flex gap-2 align-items-center"
                        onClick={() => {
                          setIsDiscountEdit(true);
                        }}
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
                    )}
                  </div>
                </div>
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
                {product.product_medias.map((media) => {
                  return (
                    <div className="dropzone-preview mb-2">
                      <div className="bg-white position-relative image-hover-container">
                        <img
                          src={media.url}
                          width="170px"
                          height="170px"
                          className="image-hover-img"
                        ></img>
                        <button
                          className="btn btn-danger position-absolute top-50 start-50 translate-middle image-hover-button"
                          onClick={onDeleteImage}
                          data-image-id={media.id}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                    multiple={true}
                    maxFiles={8}
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
          <div className="reviews-container mb-5 border rounded">
            <h2>Đánh giá sản phẩm</h2>
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
                {product.product_reviews.map((review) => {
                  return (
                    <tr>
                      <td>{review.user.email}</td>
                      <td>
                        <div className="rate">
                          {[1, 2, 3, 4, 5].map((key, index) => {
                            if (index < Math.round(product.rating)) {
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
                      <td>{ formatDateToDDMMYY(review.createdAt) }</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </>
  );
}

export default DetailProduct;
