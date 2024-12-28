"use client";
import { useState, useEffect } from "react";
import { formatMoney } from "@/app/lib/helps";
import {
  getAddresses,
  updateAddressAPI,
  deleteAddress,
  createAddress,
  getDeliveries,
  getCart,
  getCoupons,
  payment
} from "@/app/lib/helps";
import Modal from "../modal/modal";

const Checkout = () => {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [cart, setCart] = useState({ cart_items: [] });
  const [addresses, setAddresses] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [updateAddress, setUpdateAddress] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [checkout, setCheckout] = useState({})
  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
  });
  const [showModal, setShowModal] = useState({
    status: false,
    title: "",
    message: "",
  });
  const [addValue, setAddValue] = useState({
    fullName: undefined,
    phoneNumber: undefined,
    address: undefined,
    province: undefined,
    additionalInformation: undefined,
    isDefault: false,
  });

  // Update summary
  const updateSummary = () => {
    setSummary((prevSummary) => {
      let subtotal = 0;
      let discount = 0;
      cart.cart_items.forEach((item) => {
        const price =
          item.product_variant != null
            ? item.product_variant.regularPrice
            : item.product.regularPrice;
        subtotal += price * item.quantity;
        if (
          new Date() > new Date(item.product.startSale) &&
          new Date() < new Date(item.product.endSale)
        ) {
          discount +=
            item.product.type_discount === "percent"
              ? (price * item.product.discount) / 100
              : item.product.discount;
        }
      });
      let tax = (subtotal * 5) / 100;
      return { subtotal, discount, tax };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      // get addresses
      let httpRes = await getAddresses();
      let shippingAddress = {}
      if (httpRes.status === 200) {
        setAddresses(httpRes.data.data);
        for (let i = 0; httpRes.data.data; i++) {
          if (httpRes.data.data[i].isDefault) {
            shippingAddress.fullName = httpRes.data.data[i].fullName,
            shippingAddress.phoneNumber = httpRes.data.data[i].phoneNumber,
            shippingAddress.address = httpRes.data.data[i].phoneNumber,
            shippingAddress.province = httpRes.data.data[i].province
            break
          }
        }
      }

      // get deliveries
      httpRes = await getDeliveries();
      let shippingMethod
      if (httpRes.status === 200) {
        setDeliveries(httpRes.data.data);
        shippingMethod = httpRes.data.data[0].id
      }

      // get cart
      httpRes = await getCart();
      if (httpRes.status != 401) {
        setCart(httpRes.data);
      }

      // Get coupons
      httpRes = await getCoupons();
      if (httpRes.status === 200) {
        setCoupons(httpRes.data.data);
      }

      // Init Checkout information
      setCheckout({shippingAddress, shippingMethod, paymentMethod: 'paypal'})
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateSummary();
  }, [cart]);

  // change input add address
  const onChangeAddAddress = (event) => {
    let newData = addValue;
    newData[event.currentTarget.name] = event.currentTarget.value;
    setAddValue(newData);
  };

  // Handle delete a address
  const handleDeleteAddress = async (event) => {
    event.preventDefault();
    const addressId = event.currentTarget.dataset.addressId;
    const httpResult = await deleteAddress(addressId);
    if (httpResult.status === 422) {
      setShowModal({
        status: true,
        title: "Xóa địa chỉ thất bại",
        message:
          "Đây là địa chỉ mặc định, phải chọn một địa chỉ khác làm mặc định trước khi xóa",
      });
      return;
    }
    setAddresses((prev) => {
      let newData = prev.filter((address) => {
        if (addressId != address.id) {
          return address;
        }
      });
      return newData;
    });
  };

  // Checkout
  const handleCheckout = async (event) => {
    event.preventDefault();
    console.log(checkout)
    const httpRes = await payment(checkout)
    if (httpRes.status === 200) {
      window.location.href = httpRes.data.url
    }
  }

  // Update a user address
  const handleUpdateAddress = async (event) => {
    event.preventDefault();
    const httpRes = await updateAddressAPI(
      updateAddress.id,
      updateAddress.data
    );
    if (httpRes.status != 200) {
      setShowModal({
        status: true,
        title: "Cập nhật địa chỉ thất bại",
        message: "",
      });
      return;
    } else {
      // setShowModal({ status: true, title: 'Cập nhật địa chỉ thành công', message: ''})
      alert("Cập nhật địa chỉ thành công");
    }
    const newAddress = httpRes.data;
    let newData = addresses;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id == newAddress.id) {
      }
    }
    const detail = document.getElementById(
      `detail-address-${updateAddress.id}`
    );
    const edit = document.getElementById(`address-edit-${updateAddress.id}`);
    detail.classList.add("hidden");
    edit.textContent = "Sửa";
    edit.dataset.status = "cancel";
  };

  const enableEditAddress = (event) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.addressId;
    if (updateAddress.id && updateAddress.id != id) {
      let detail = document.getElementById(
        `detail-address-${updateAddress.id}`
      );
      let edit = document.getElementById(`address-edit-${updateAddress.id}`);
      detail.classList.add("hidden");
      edit.textContent = "Sửa";
      edit.dataset.status = "cancel";
    }

    let status = event.currentTarget.dataset.status;
    let detail = document.getElementById(`detail-address-${id}`);
    if (status === "edit") {
      setUpdateAddress({});
      event.currentTarget.textContent = "Sửa";
      detail.classList.add("hidden");
      event.currentTarget.dataset.status = "cancel";
    } else {
      setUpdateAddress({ id, data: {} });
      event.currentTarget.textContent = "Hủy";
      detail.classList.remove("hidden");
      event.currentTarget.dataset.status = "edit";
    }
  };

  const onUpdate = (event) => {
    if (event.currentTarget.name === "address-fullname") {
      setUpdateAddress((prev) => {
        let newData = prev;
        newData.data.fullName = event.target.value;
        return newData;
      });
    } else if (event.currentTarget.name === "address-phonenumber") {
      setUpdateAddress((prev) => {
        let newData = prev;
        newData.data.phoneNumber = event.target.value;
        return newData;
      });
    } else if (event.currentTarget.name === "address-address") {
      setUpdateAddress((prev) => {
        let newData = prev;
        newData.data.address = event.target.value;
        return newData;
      });
    } else if (event.currentTarget.name === "address-province") {
      setUpdateAddress((prev) => {
        let newData = prev;
        newData.data.province = event.target.value;
        return newData;
      });
    } else if (event.currentTarget.name == "address-additionalinformation") {
      setUpdateAddress((prev) => {
        let newData = prev;
        newData.data.additionalInformation = event.target.value;
        return newData;
      });
    } else {
      setUpdateAddress((prev) => {
        let newData = prev;
        newData.data.isDefault = true;
        return newData;
      });
    }
  };

  const handleAddAddress = async (event) => {
    if (
      !addValue.fullName &&
      !addValue.phoneNumber &&
      !addValue.address &&
      !addValue.province
    ) {
      setShowModal({
        status: true,
        title: "Thêm địa chỉ thất bại",
        message: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }
    const httpRes = await createAddress(addValue);
    if (httpRes.status != 201) {
      setShowModal({
        status: true,
        title: "Thêm địa chỉ thất bại",
        message: httpRes.response.data.errors[0].detail,
      });
      return;
    }
    let newAddress = httpRes.data.data;
    let newData = addresses;
    if (newAddress.isDefault) {
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id != newAddress.id && newData[i].isDefault) {
          newData[i].isDefault = false;
        }
      }
    }
    newData.push(newAddress);
    setAddresses(newData);
    setIsAddAddress(false);
  };

  return (
    <>
      <div className="container mx-auto p-3">
        {showModal.status ? (
          <Modal
            title={showModal.title}
            message={showModal.message}
            deactivate={false}
            onClose={() =>
              setShowModal({ status: false, title: "", message: "" })
            }
          />
        ) : (
          <></>
        )}
        <h2 className="text-3xl font-bold mb-4">Check out</h2>
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <form>
              <div className="flex gap-3 items-center mb-5">
                <h3 className="font-semibold text-xl">
                  Chọn địa chỉ giao hàng
                </h3>
              </div>
              <div className="mb-5">
                <ul className="grid grid-cols-2 w-full gap-6 md:grid-cols-2">
                  {addresses.map((address, index) => {
                    return (
                      <li className="col-span-2" key={`address-${address.id}`}>
                        <div className="flex justify-between p-5 bg-white border border-gray-300 rounded">
                          <div className="flex">
                            <div className="flex p-2">
                              {address.isDefault ? (
                                <input
                                  id={`address-radio-${address.id}`}
                                  type="radio"
                                  value={address.id}
                                  name="address-input"
                                  defaultChecked
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                              ) : (
                                <input
                                  id={`address-radio-${address.id}`}
                                  type="radio"
                                  value={address.id}
                                  name="address-input"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                              )}
                            </div>
                            <label
                              htmlFor="address-input"
                              className="w-fullms-3 text-sm font-medium"
                            >
                              <h4 className="font-semibold text-lg">
                                {address.fullName} -{" "}
                                <span>({address.phoneNumber})</span>
                              </h4>
                              <p>{`${address.address}, ${address.province}`}</p>
                            </label>
                            <div className="ms-4">
                              {address.isDefault ? (
                                <span className="text-blue-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400">
                                  mặc định
                                </span>
                              ) : (
                                <> </>
                              )}
                            </div>
                          </div>
                          <div>
                            <a
                              href="#"
                              data-address-id={address.id}
                              data-status="cancel"
                              onClick={enableEditAddress}
                              id={`address-edit-${address.id}`}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Sửa
                            </a>
                          </div>
                        </div>
                        <div
                          id={`detail-address-${address.id}`}
                          className="hidden grid grid-cols-2 gap-4 rounded border border-t-0 border-gray-300 p-4"
                        >
                          <div className="col-span-1">
                            <label
                              htmlFor="address-fullname"
                              className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                              Họ và tên:
                            </label>
                            <input
                              type="text"
                              id="address-fullname"
                              name="address-fullname"
                              onChange={onUpdate}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={address.fullName}
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              htmlFor="address-phonenumber"
                              className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                              Số điện thoại:
                            </label>
                            <input
                              type="text"
                              id="address-phonenumber"
                              onChange={onUpdate}
                              name="address-phonenumber"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={address.phoneNumber}
                            />
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="address-address"
                              className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                              Địa chỉ:
                            </label>
                            <input
                              type="text"
                              id="address-address"
                              onChange={onUpdate}
                              name="address-address"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={`${address.address}`}
                            />
                            <input
                              type="text"
                              id="address-province"
                              onChange={onUpdate}
                              name="address-province"
                              className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={`${address.province}`}
                            />
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="address-additionalinformation"
                              className="block mb-2 text-base font-semibold text-gray-900"
                            >
                              Thông tin thêm:
                            </label>
                            <textarea
                              id="address-additionalinformation"
                              onChange={onUpdate}
                              rows="4"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                              placeholder={address.additionalInformation}
                            ></textarea>
                          </div>
                          <div className="flex items-center mb-4">
                            {address.isDefault ? (
                              <>
                                <input
                                  id="address-isdefault"
                                  type="radio"
                                  value={address.isDefault}
                                  name="address-isdefault"
                                  defaultChecked
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                  htmlFor="address-isdefault"
                                  className="ms-2 text-base text-gray-900"
                                >
                                  Địa chỉ mặc định
                                </label>
                              </>
                            ) : (
                              <>
                                <input
                                  id="address-isdefault"
                                  type="radio"
                                  value={true}
                                  name="address-isdefault"
                                  onChange={onUpdate}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                  htmlFor="address-isdefault"
                                  className="ms-2 text-base text-gray-900"
                                >
                                  Địa chỉ mặc định
                                </label>
                              </>
                            )}
                          </div>
                          <button
                            data-address-id={address.id}
                            onClick={handleDeleteAddress}
                            type="button"
                            className="col-span-2 text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                          >
                            Xóa địa chỉ
                          </button>
                          <button
                            data-address-index={index}
                            onClick={handleUpdateAddress}
                            type="button"
                            className="col-span-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 me-2 mb-2"
                          >
                            Hoàn thành
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {isAddAddress ? (
                <>
                  <hr />
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="col-span-1">
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                      >
                        Họ và tên: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        onChange={onChangeAddAddress}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Trần Quang Kiệt"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                      >
                        Số điện thoại: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={onChangeAddAddress}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0123456789"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                      >
                        Địa chỉ: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={onChangeAddAddress}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Tên đường, Tòa nhà, Số nhà"
                        required
                      />
                      <input
                        type="text"
                        id="province"
                        name="province"
                        onChange={onChangeAddAddress}
                        className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="additionalInformation"
                        className="block mb-2 text-base font-semibold text-gray-900"
                      >
                        Thông tin thêm:
                      </label>
                      <textarea
                        id="additionalInformation"
                        name="additionalInformation"
                        onChange={onChangeAddAddress}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="isDefault"
                        type="radio"
                        value={true}
                        name="isDefault"
                        onChange={onChangeAddAddress}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        forHtml="isDefault"
                        className="ms-2 text-base text-gray-900"
                      >
                        Đặt làm địa chỉ mặc định
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddAddress(false);
                      }}
                      className="col-span-2 text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={handleAddAddress}
                      className="col-span-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 me-2 mb-2"
                    >
                      Thêm địa chỉ
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-5">
                    <button
                      type="button"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setIsAddAddress(true);
                      }}
                      className="flex justify-center gap-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                        width="15px"
                        height="15px"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                      </svg>
                      Thêm một địa chỉ mới
                    </button>
                  </div>
                </>
              )}
              <hr className="my-6"></hr>
              <h3 className="font-semibold text-xl mb-5">
                Phương thức vận chuyển
              </h3>
              <div className="grid grid-cols-2 gap-10">
                {deliveries.map((delivery, index) => {
                  return (
                    <div
                      className="flex bg-white rounded p-4"
                      key={`delivery-${delivery.id}`}
                    >
                      <div className="flex items-center h-5 mt-2 me-2">
                        {index === 0 ? (
                          <>
                            <input
                              id={`delivery-method-${delivery.id}`}
                              name="delivery-method"
                              aria-describedby="helper-radio-text"
                              type="radio"
                              defaultChecked
                              value={delivery.id}
                              onChange={(event) => { setCheckout({ ...checkout, shippingMethod: event.currentTarget.value})}}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500"
                            />
                          </>
                        ) : (
                          <>
                            <input
                              id={`delivery-method-${delivery.id}`}
                              name="delivery-method"
                              aria-describedby="helper-radio-text"
                              type="radio"
                              value={delivery.id}
                              onChange={(event) => { setCheckout({ ...checkout, shippingMethod: event.currentTarget.value})}}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500"
                            />
                          </>
                        )}
                      </div>
                      <div className="ms-2 text-xl">
                        <label
                          htmlFor={`delivery-method-${delivery.id}`}
                          className="font-medium text-gray-900"
                        >
                          {delivery.name}
                          <span className="text-lg">
                            {" "}
                            - {formatMoney(delivery.cost)}
                          </span>
                        </label>
                        <h6 className="text-xs text-gray-500 font-bold mt-2">
                          Nhận hàng từ {delivery.estimatedTime}
                        </h6>
                        <h6 className="text-xs text-blue-400 font-bold mt-1">
                          {delivery.description}
                        </h6>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="my-6"></hr>
              <h3 className="font-semibold text-xl mb-5">
                Phương thức thanh toán
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex justify-between bg-white rounded p-6 bg-gray-100">
                  <div className="ms-2 text-xl">
                    <label
                      htmlFor="payment-paypal"
                      className="font-semibold text-base text-gray-900 flex items-center gap-3"
                    >
                      <svg
                        width="25px"
                        height="25px"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="paypal"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="#2557D6"
                          d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                        ></path>
                      </svg>
                      Thanh toán bằng Paypal
                    </label>
                  </div>
                  <div className="flex h-5 mt-2 me-2">
                    <input
                      id="payment-paypal"
                      aria-describedby="helper-radio-text"
                      type="radio"
                      value="paypal"
                      name="payment-method"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center bg-white rounded p-6 bg-gray-100">
                  <div className="ms-2 text-xl">
                    <label
                      htmlFor="payment-cash"
                      className="font-semibold text-black text-base flex gap-4 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="25px"
                        height="25px"
                        fill="#2557D6"
                      >
                        <path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c0 0 0 0 0 0s0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15c0 0 0 0 0 0l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z" />
                      </svg>
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div className="flex h-5 mt-2 me-2">
                    <input
                      id="payment-cash"
                      aria-describedby="helper-radio-text"
                      type="radio"
                      value="cash"
                      name="payment-method"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500"
                    />
                  </div>
                </div>
              </div>
              <hr className="my-6"></hr>
              <h3 className="font-semibold text-xl mb-5">Mã giảm giá</h3>
              <div className="grid grid-cols-1 gap-5 max-h-[400px] overflow-y-auto">
                {coupons.map((coupon, index) => {
                  return (
                    <div className="flex justify-between items-center bg-white rounded p-6 bg-gray-100">
                      <div className="ms-2 text-xl">
                        <label
                          htmlFor="payment-cash"
                          className="font-semibold text-black text-base flex gap-4 items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            width="30px"
                            height="30px"
                            fill="orange"
                          >
                            <path d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z" />
                          </svg>
                          <div>
                            <span>{coupon.name}</span>
                            <p className="text-sm font-medium">
                              {coupon.description}
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className="flex h-5 mt-2 me-2">
                        <input
                          id="coupon"
                          aria-describedby="helper-radio-text"
                          type="radio"
                          value={coupon.id}
                          name="coupon"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
          <div className="col-span-1">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <div className="flex items-center justify-between mb-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Summary
                </h5>
              </div>
              <div>
                {summary &&
                  cart.cart_items.map((item, index) => {
                    return (
                      <div className="grid grid-cols-6 mb-3" key={index}>
                        <div className="col-span-3">
                          <div className="flex items-center">
                            <img
                              className="me-3 ms-1"
                              src={item.product.product_medias[0].url}
                              width="40"
                              alt=""
                            />
                            <h6 className="text-sm line-clamp-2 font-medium">
                              {item.product.name}
                            </h6>
                          </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          <h6 className="text-sm font-semibold">
                            x{item.quantity}
                          </h6>
                        </div>
                        <div className="col-span-2 flex items-center justify-end">
                          <h6 className="text-sm font-semibold">
                            {item.product_variant != null
                              ? formatMoney(
                                  item.product_variant.regularPrice *
                                    item.quantity
                                )
                              : formatMoney(
                                  item.product.regularPrice * item.quantity
                                )}
                            {/* {item.product_variant != null
                                        ? item.product_variant.startSale != null &&
                                          item.product_variant.endSale != null &&
                                          new Date() >
                                            new Date(item.product_variant.startSale) &&
                                          new Date() <
                                            new Date(item.product_variant.endSale)
                                          ? formatMoney(
                                              item.product_variant.salePrice * item.quantity
                                            )
                                          : formatMoney(
                                              item.product_variant.regularPrice *
                                                item.quantity
                                            )
                                        : item.product.startSale != null &&
                                          item.product.endSale != null &&
                                          new Date() > new Date(item.product.startSale) &&
                                          new Date() < new Date(item.product.endSale)
                                        ? formatMoney(
                                            item.product.salePrice * item.quantity
                                          )
                                        : formatMoney(
                                            item.product.regularPrice * item.quantity
                                          )} */}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-10">
                <div className="flex justify-between mb-2">
                  <h5 className="text-lg font-medium">Subtotal :</h5>
                  <h5 className="text-lg font-medium">
                    {formatMoney(summary.subtotal)}
                  </h5>
                </div>
                <div className="flex justify-between mb-2">
                  <h5 className="text-lg font-medium">Discount :</h5>
                  <h5 className="text-lg font-medium text-red-600">
                    -{formatMoney(summary.discount)}
                  </h5>
                </div>
                <div className="flex justify-between mb-2">
                  <h5 className="text-lg font-medium">Tax :</h5>
                  <h5 className="text-lg font-medium">
                    {formatMoney(summary.tax)}
                  </h5>
                </div>
                {/* <div className="flex justify-between mb-2">
                              <h5 className="text-lg font-medium">Shipping cost :</h5>
                              <h5 className="text-lg font-medium">$691</h5>
                            </div> */}
              </div>
              <div className="flex justify-between mt-7 mb-5">
                <h4 className="text-xl font-bold">Total:</h4>
                <h4 className="text-xl font-bold">
                  {formatMoney(
                    summary.subtotal - summary.discount + summary.tax
                  )}
                </h4>
              </div>
              <hr />
              <div className="mt-5">
                <a
                  href="/account/checkout"
                  onClick={handleCheckout}
                  className="block text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
