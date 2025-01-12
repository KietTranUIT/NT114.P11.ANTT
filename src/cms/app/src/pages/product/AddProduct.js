import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import {
  getCategories,
  getBrandsV2,
  getProductAttributes,
  createProduct,
  getTags,
} from "./../../helpers";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Modal from "../../components/modal/modal";
import "./addproduct.css";

function AddProduct() {
  const editorRef = useRef(null);
  const [preview, setPreview] = useState({ pr: false, url: "" });
  const [upload, setUpload] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [variants, setVariants] = useState([
    {
      size: 1,
      options: [
        {
          id: "",
          value: "",
        },
      ],
    },
  ]);
  const [signal, setSignal] = useState(0);
  const [detailProduct, setDetailProduct] = useState("pricingTab");
  const [selectedTags, setSelectedTags] = useState([]);

  function parseCurrency(value) {
    // Loại bỏ dấu chấm (.) trong chuỗi và chuyển thành số
    return parseInt(value.replace(/\./g, ""), 10) || 0;
  }

  function formatCurrencyInput(event) {
    let value = event.target.value.replace(/[^0-9]/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    event.target.value = value;
}

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all product categories
      const result1 = await getCategories();
      if (!(result1 instanceof Error)) {
        setCategories(result1.data);
      }

      // Fetch all product brands
      const result2 = await getBrandsV2({
        field: "id,name",
      });
      if (!(result2 instanceof Error)) {
        setBrands(result2.data);
      }

      // Fetch all proudct attriubtes
      const result3 = await getProductAttributes();
      if (!(result3 instanceof Error)) {
        setAttributes(result3.data);
      }

      // Fetch all product tags
      const result4 = await getTags();
      if (!(result4 instanceof Error)) {
        setTags(result4.data);
      }
    };
    fetchData();
  }, []);

  // Render slug when input in name category
  const handleChangeInputname = (event) => {
    let name = event.target.value;
    const slug = slugify(name, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
      trim: true, // Trim leading/trailing spaces
    });

    const nameInput = document.getElementById("slug-product");
    nameInput.value = slug;
  };

  // Handle click add product
  const handleAddProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Get name product
    const name = document.getElementById("name-product").value;
    // Get slug product
    const slug = document.getElementById("slug-product").value;
    // Get description product
    const description = editorRef.current.getContent({ format: "html" });
    // Get category of product
    let categoryId = document.getElementById("category-selects").value;
    if (categoryId === "none") {
      categoryId = undefined;
    }
    // Get brand of product
    let brandId = document.getElementById("brand-selects").value;
    if (brandId === "none") {
      brandId = undefined;
    }
    // Get regular price of product
    let regularPrice = parseCurrency(document.getElementById("product-price-input").value)
      
    if (isNaN(regularPrice)) {
      regularPrice = undefined;
      setModalContent({
        type: "error",
        title: "Lỗi",
        message: "Giá sản phẩm phải là một số.",
      });
      setShowModal(true);
      return;
    }
    // Get stock of product
    let stock = Number(document.getElementById("product-stock-input").value);
    if (isNaN(regularPrice)) {
      stock = 0;
    }

    let tagData = [];
    selectedTags.forEach((tag) => {
      tagData.push(tag.id);
    });
    // Get start date sale
    // let startSale = document.getElementById("start-sale-input").value;
    // if (!startSale) {
    //   startSale = undefined;
    // }
    // // Get end date sale
    // let endSale = document.getElementById("end-sale-input").value;
    // if (!endSale) {
    //   endSale = undefined;
    // }

    // // Get sale price sale
    // let salePrice = document.getElementById("sale-price-input").value;
    // if (salePrice && isNaN(Number(salePrice))) {
    //   salePrice = undefined;
    // }

    // Get selected tags of product
    let product = {
      name,
      slug,
      description,
      regularPrice,
      categoryId,
      brandId,
      stock,
      tags: tagData,
    };

    // variant
    let variantData = [];
    for (let variant of variants) {
      let data = {
        attributes: [],
      };
      for (let option of variant.options) {
        if (option.id !== "" && option.value !== "") {
          data.attributes.push({
            attributeId: option.id,
            value: option.value,
          });
        }
      }
      if (data.attributes.length > 0) {
        variantData.push(data);
      }
    }

    const data = new FormData();
    data.append("product", JSON.stringify(product));
    data.append("variant", JSON.stringify(variantData));
    if (upload == "") {
      setModalContent({
        type: "error",
        title: "Lỗi",
        message: "Vui lòng chọn một file hình ảnh!",
      });
      setShowModal(true);
      return;
    }
    data.append("file", upload);

    // Send request create product
    const result = await createProduct(data);
    setIsLoading(false);
    // Check if error
    if (result.response && result.status != 201) {
      const errors = result.response.data.errors;
      let message = "";
      errors.forEach((err) => {
        message = message + err.detail + "\n";
        // if (err.source.pointer === "/brand/name") {
        //   setModalContent({
        //     type: "error",
        //     title: "Lỗi",
        //     message:
        //       "Tên của thương hiệu đã tồn tại. Vui lòng chọn một tên khác!",
        //   });
        //   setShowModal(true);
        // } else {
        //   setModalContent({
        //     type: "error",
        //     title: "Lỗi",
        //     message:
        //       "Slug của thương hiệu đã tồn tại. Vui lòng chọn một slug khác",
        //   });
        //   setShowModal(true);
        // }
      });
      setShowModal(true);
      setModalContent({
        type: "error",
        title: "Lỗi",
        message: message,
      });
      return;
    }

    // If success
    setModalContent({
      type: "success",
      title: "Thành công",
      message: "Tạo sản phẩm thành công",
    });
    setShowModal(true);
  };

  // Handle remove error alert
  const handleRemoveErrorAlert = (event) => {
    const id = event.target.id;
    document.getElementById(id).classList.remove("border-danger");
    document.getElementById(id + "-error").classList.add("d-none");
  };

  // When drag file
  const handleOnDropFile = (acceptedFiles) => {
    let selectedFile = acceptedFiles[0];
    setPreview({ pr: true, url: URL.createObjectURL(selectedFile) });
    setUpload(selectedFile);
  };

  // Close preview card
  const handleClosePreviewCard = () => {
    setPreview({ pr: false, url: "" });
  };

  // Add a option
  const handleAddOption = (event) => {
    const index = event.currentTarget.dataset.variantIndex;
    setVariants((preVariants) => {
      let newVariants = preVariants;
      newVariants[index].size += 1;
      newVariants[index].options.push({ id: "", value: "" });
      return newVariants;
    });
    setSignal((prev) => prev + 1);
  };

  // Add a variant ui
  const handleAddVariant = (event) => {
    event.preventDefault();
    setVariants([
      ...variants,
      {
        size: 1,
        options: [
          {
            id: "",
            value: "",
          },
        ],
      },
    ]);
  };

  // Remove a variant ui
  const handleRemoveVariant = (event) => {
    event.preventDefault();
    const index = event.currentTarget.dataset.variantIndex;
    setVariants((prevVariants) => prevVariants.filter((_, i) => index != i));
  };

  // Remove option
  const handleRemoveOption = (event) => {
    event.preventDefault();
    const variantIndex = event.currentTarget.dataset.variantIndex;
    const optionIndex = event.currentTarget.dataset.optionIndex;

    setVariants((preVariants) => {
      let newVariants = preVariants;
      newVariants[variantIndex].options = newVariants[
        variantIndex
      ].options.filter((_, i) => i != optionIndex);
      return newVariants;
    });
    setSignal((prev) => prev + 1);
  };

  // Handle when click
  const handleOnChangeTagDetail = (event) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    setDetailProduct(id);
  };

  const handleOnChangeInput = (event) => {
    const variantIndex = event.target.dataset.variantIndex;
    const optionIndex = event.target.dataset.optionIndex;
    setVariants((prevVariants) => {
      prevVariants[variantIndex].options[optionIndex].value =
        event.target.value;
      return prevVariants;
    });
  };

  const handleOnChangeSelect = (event) => {
    const variantIndex = event.target.dataset.variantIndex;
    const optionIndex = event.target.dataset.optionIndex;
    const selectedOption = event.target.options[event.target.selectedIndex];
    setVariants((prevVariants) => {
      prevVariants[variantIndex].options[optionIndex].id = selectedOption.value;
      return prevVariants;
    });
  };

  // Add a selected tag
  const handleAddSelectedTag = (event) => {
    const index = event.target.dataset.tagIndex;
    const tag = tags[index];
    // Save tag to selected list
    setSelectedTags((prevTags) => {
      for (let i = 0; i < prevTags.length; i++) {
        if (prevTags[i].id === tag.id && prevTags[i].name === tag.name) {
          return prevTags;
        }
      }
      return [...prevTags, tag];
    });
  };

  // Remove a selected tag
  const handleRemoveSelectedTag = (event) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.tagIndex;
    setSelectedTags((prevTags) => {
      let newTags = prevTags.filter((tagItem) => tagItem.id != id);
      return newTags;
    });
  };

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => setShowModal(false)}
          message={modalContent.message}
          title={modalContent.title}
          type={modalContent.type}
        />
      )}
      <form className="add-product-content mb-9">
        {showModal && <div className="modal-backdrop fade show"></div>}
        <div className="d-flex justify-content-between mb-5">
          <div className="add-product-header-left">
            <h1 className="fw-bold" style={{ color: "black" }}>
              Thêm sản phẩm
            </h1>
          </div>
          <div className="d-flex align-items-center gap-2">
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
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddProduct}
              >
                Tạo
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h4 className="mb-3">
              Tên sản phẩm <span style={{ color: "red" }}>*</span>
            </h4>
            <div className="mb-5">
              <input
                type="text"
                className="form-control"
                placeholder="tên sản phẩm"
                onChange={handleChangeInputname}
                id="name-product"
              ></input>
            </div>
            <h4 className="mb-3">
              Slug <span style={{ color: "red" }}>*</span>
            </h4>
            <div className="mb-5">
              <input
                type="text"
                className="form-control mb-5"
                id="slug-product"
                readOnly
                onClick={handleRemoveErrorAlert}
              ></input>
              <span className="text-danger d-none" id="slug-category-error">
                error
              </span>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">Mô tả</h4>
              <Editor
                id="description-category"
                apiKey="nalj1qwh3ngb7zpj4u9hwsgg97w4ll0awqdypqjqfr11mt62"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 700,
                  menubar: false,
                  resize: false,
                  selector: "textarea#open-source-plugins",
                  plugins:
                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                  editimage_cors_hosts: ["picsum.photos"],
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                  autosave_ask_before_unload: true,
                  autosave_interval: "30s",
                  autosave_prefix: "{path}{query}-{id}-",
                  autosave_restore_when_empty: false,
                  autosave_retention: "2m",
                  image_advtab: true,
                  // // plugins: [
                  // //   "advlist autolink lists link image charmap print preview anchor",
                  // //   "searchreplace visualblocks code fullscreen",
                  // //   "insertdatetime media table paste code help wordcount",
                  // // ],
                  // // valid_elements: '*[*]',
                  // // content_style:
                  // //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  // plugins:
                  //   "a11ychecker advcode advlist advtable anchor autocorrect autosave editimage image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",
                  // toolbar:
                  //   "undo redo | styles | bold italic underline strikethrough | align | table link image media pageembed | bullist numlist outdent indent | spellcheckdialog a11ycheck typography code",
                }}
              />
            </div>
            <h4 className="mb-3">
              Hình ảnh <span style={{ color: "red" }}>*</span>
            </h4>
            <div className="dropzone mb-5">
              <div
                className={
                  preview.pr
                    ? "dropzone-preview mb-2"
                    : "dropzone-preview mb-2 d-none"
                }
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
              </div>
              <Dropzone
                onDrop={handleOnDropFile}
                multiple={false}
                accept={"image/*"}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="row">
                      <div className="dropzone-items col-12 p-5 d-flex flex-column align-items-center gap-2">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                          <div className="d-flex justify-content-center gap-2">
                            Drag your photos or
                            <a className="text-decoration-none btn btn-link p-0">
                              Browse from device
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
            <h4 className="mb-3">
              Chi tiết sản phẩm <span style={{ color: "red" }}>*</span>{" "}
            </h4>
            <div className="row g-0 border-top border-bottom mb-5">
              <div className="col-sm-4">
                <div
                  className="nav flex-sm-column border-bottom-sm-0 border-end-sm fs-9 vertical-tab h-100 justify-content-between"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="p-4 fw-semibold nav-link border-end border-end-sm-0 border-bottom text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center"
                    id="pricingTab"
                    data-bs-toggle="tab"
                    data-bs-target="#pricingTabContent"
                    role="tab"
                    aria-controls="pricingTabContent"
                    aria-selected="true"
                    onClick={handleOnChangeTagDetail}
                    style={{
                      color:
                        detailProduct === "pricingTab" ? "#007bff" : "black",
                    }}
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-tag me-sm-2 fs-4 nav-icons"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    <span
                      className="detail-price d-none d-sm-inline"
                      style={{ color: "inherit" }}
                    >
                      Giá
                    </span>
                  </a>
                  <a
                    className="p-4 fw-semibold nav-link border-end border-end-sm-0 border-bottom text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center active"
                    id="restockTab"
                    data-bs-toggle="tab"
                    data-bs-target="#restockTabContent"
                    role="tab"
                    aria-controls="restockTabContent"
                    aria-selected="false"
                    tabindex="-1"
                    onClick={handleOnChangeTagDetail}
                    style={{
                      color:
                        detailProduct === "restockTab" ? "#007bff" : "black",
                    }}
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-package me-sm-2 fs-4 nav-icons"
                    >
                      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    <span
                      className="d-none d-sm-inline"
                      style={{ color: "inherit" }}
                    >
                      Kho hàng
                    </span>
                  </a>
                  {/* <a
                    className="p-4 fw-semibold nav-link border-end border-end-sm-0 text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center d-none hiddend"
                    id="productsTab"
                    data-bs-toggle="tab"
                    data-bs-target="#productsTabContent"
                    role="tab"
                    aria-controls="productsTabContent"
                    aria-selected="false"
                    tabindex="-1"
                    onClick={handleOnChangeTagDetail}
                    style={{
                      color:
                        detailProduct === "productsTab" ? "#007bff" : "black",
                    }}
                    href="#"
                  >
                    <svg
                      xmlns="texthttp://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-globe me-sm-2 fs-4 nav-icons"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span
                      className="d-none d-sm-inline"
                      style={{ color: "inherit" }}
                    >
                      Giảm giá
                    </span>
                  </a> */}
                </div>
              </div>
              <div className="col-sm-8">
                <div className="tab-content py-3 ps-sm-4 h-100">
                  <div
                    className={`tab-pane fade ${
                      detailProduct === "pricingTab" ? "active show" : "d-none"
                    }`}
                    id="pricingTabContent"
                    role="tabpanel"
                    aria-labelledby="pricingTab"
                  >
                    <div className="row g-3">
                      <div className="col-12 col-lg-6">
                        <h5 className="mb-2 text-body-highlight ">
                          Giá bình thường{" "}
                          <span style={{ color: "red" }}>*</span>
                        </h5>
                        <input
                          id="product-price-input"
                          name="product-price-input"
                          className="form-control"
                          type="text"
                          placeholder="2.000.000"
                          onChange={formatCurrencyInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      detailProduct === "restockTab" ? "active show" : "d-none"
                    }`}
                    id="restockTabContent"
                    role="tabpanel"
                    aria-labelledby="pricingTab"
                  >
                    <div className="row g-3">
                      <div className="col-12 col-lg-6">
                        <h5 className="mb-2 text-body-highlight ">
                          Số lượng trong kho{" "}
                          <span style={{ color: "red" }}>*</span>
                        </h5>
                        <input
                          id="product-stock-input"
                          name="product-stock-input"
                          className="form-control"
                          type="number"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      detailProduct === "productsTab" ? "active show" : "d-none"
                    }`}
                    id="productsTabContent"
                    role="tabpanel"
                    aria-labelledby="productsTab"
                  >
                    <div className="row g-3">
                      <div className="col-12 col-lg-6">
                        <h5 className="mb-2 text-body-highlight">
                          Ngày bắt đầu
                        </h5>
                        <input
                          id="start-sale-input"
                          className="form-control"
                          type="date"
                        />
                      </div>
                      <div class="col-12 col-lg-6">
                        <h5 class="mb-2 text-body-highlight ">Ngày kết thúc</h5>
                        <input
                          id="end-sale-input"
                          className="form-control"
                          type="date"
                        />
                      </div>
                      <div class="col-12 col-lg-6">
                        <h5 class="mb-2 text-body-highlight ">Giá Sale</h5>
                        <input
                          id="sale-price-input"
                          className="form-control"
                          type="text"
                          placeholder="vnđ"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row g-2">
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title mb-4 fw-bold">Lựa chọn</h4>
                    <div className="row gx-3">
                      <div className="col-12">
                        <div className="mb-4">
                          <div className="d-flex flex-wrap mb-2">
                            <h5 className="mb-0 me-2 fs-6 text-body-highlight fw-semibold">
                              Danh mục sản phẩm
                            </h5>
                          </div>
                          <select
                            className="form-select mb-3"
                            id="category-selects"
                          >
                            <option value="none">-</option>
                            {categories.map((item, index) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-4">
                          <div className="d-flex flex-wrap mb-2">
                            <h5 className="mb-0 me-2 fs-6 text-body-highlight fw-semibold">
                              Thương hiệu sản phẩm
                            </h5>
                          </div>
                          <select
                            className="form-select mb-3"
                            id="brand-selects"
                          >
                            <option value="none">-</option>
                            {brands.map((item, index) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-4">
                          <div className="d-flex flex-wrap mb-2">
                            <h5 className="mb-0 me-2 fs-6 text-body-highlight fw-semibold">
                              Tags
                            </h5>
                          </div>
                          <select className="form-select mb-3" id="tag-selects">
                            <option value="none">-</option>

                            {tags.map((item, index) => (
                              <option
                                value={item.id}
                                data-tag-index={index}
                                onClick={handleAddSelectedTag}
                              >
                                + {item.name}
                              </option>
                            ))}
                          </select>
                          <div className="show-selected-tags d-flex gap-2 flex-wrap">
                            {selectedTags.map((tag) => {
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
                            })}
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
                  className="btn btn-primary mb-5 d-none"
                  onClick={handleAddVariant}
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

export default AddProduct;
