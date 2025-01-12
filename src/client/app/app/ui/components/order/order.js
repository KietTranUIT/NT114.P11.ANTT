"use client";
import dynamic from "next/dynamic";
import { FormatTime, formatMoney } from "@/app/lib/helps";
const OpenStreetMap = dynamic(() => import("@/app/ui/components/openmap/map"), {
  ssr: false,
});
const Order = ({ order }) => {
  const renderTime = (time) => {
    let point = FormatTime(time).split(" ");
    return (
      <p className="text-xs font-semibold mb-0 text-nowrap text-gray-500">
        {point[1]}
        <br className="d-none d-md-block" /> {point[0]}
      </p>
    );
  };

  const order_status = {
    pending: 0,
    confirmed: 1,
    shipping: 2,
    shipped: 3,
    completed: 4,
    cancelled: 5,
    returned: 6,
  };

  const renderStatusOrder = (order) => {
    if (order.status === "shipping") {
      return "Đang giao hàng";
    } else if (order.status === "completed") {
      return "Hoàn thành";
    } else if (order.status === "pending") {
      if (order.paymentMethod === "paypal" && !order.paid) {
        return "Đang chờ thanh toán";
      } else {
        return "Đang xử lí đơn hàng";
      }
    } else {
      return "Error";
    }
  };

  return (
    <>
      <div className="container mx-auto" style={{minHeight:"700px"}}>
        <div className="flex justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold">Mã đơn hàng #{order.id}</h2>
            {/* <p>
              {" "}
              Thanh toán{" "}
              <a className="text-blue-500 hover:text-blue-700 font-bold">
                {order.payment_method === "paypal" ? "paypal" : "khi nhận hàng"}
              </a>
              , <span>{FormatTime(order.createdAt)}.</span>
            </p> */}
          </div>
          <div className="text-lg text-red-500 font-semibold">
            {renderStatusOrder(order)}
          </div>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <div>
              <div>
                <div>
                  <div className="grid grid-cols-5 mb-3">
                    <div className="col-span-1 p-2 flex flex-col justify-center">
                      <div className="relative flex items-center">
                        <div className="timeline-item-bar relative flex items-center">
                          <div
                            className={`icon-item icon-item-sm rounded-full p-2 border-4 z-10 ${
                              order_status[order.status] <
                              order_status["pending"]
                                ? "border-gray-400 text-gray-400"
                                : "border-green-500 text-green-500"
                            }`}
                            data-bs-theme="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              width="30px"
                              height="30px"
                              fill="currentColor"
                            >
                              <path
                                fill="currentColor"
                                d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`block h-[3px] ${
                              order_status[order.status] <=
                              order_status["pending"]
                                ? "bg-gray-400"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: "205px",
                            }}
                          ></span>
                        </div>
                      </div>
                      <div className="timeline-item-date text-end order-0 flex gap-3 items-center">
                        <div className="flex flex-col">
                          <h4 className="text-sm font-semibold">
                            Đang chờ xử lí
                          </h4>
                          <span className="mb-0 text-sm mb-0 text-nowrap text-gray-500 w-4 h-4"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 p-2 flex flex-col justify-center">
                      <div className="relative flex items-center">
                        <div className="timeline-item-bar relative flex items-center">
                          <div
                            className={`icon-item icon-item-sm rounded-full p-2 border-4 z-10 ${
                              order_status[order.status] <
                              order_status["confirmed"]
                                ? "border-gray-400 text-gray-400"
                                : "border-green-500 text-green-500"
                            }`}
                            data-bs-theme="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 384 512"
                              width="30px"
                              height="30px"
                              fill="currentColor"
                            >
                              <path
                                fill="currentColor"
                                d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`block h-[3px] ${
                              order_status[order.status] <=
                              order_status["confirmed"]
                                ? "bg-gray-400"
                                : "bg-green-500"
                            }`}
                            style={{
                              // position: "absolute",
                              // // left: "50%",
                              // transform: "translateX(-50%);",
                              // zIndex: 0,
                              width: "205px",
                            }}
                          ></span>
                        </div>
                      </div>
                      <div className="timeline-item-date text-end order-0 flex gap-3 items-center">
                        <div className="flex flex-col items-center">
                          <h4 className="text-sm font-semibold">
                            Đơn hàng đã đặt
                          </h4>
                          {order_status[order.status] <
                          order_status["confirmed"] ? (
                            <span className="mb-0 text-sm mb-0 text-nowrap text-gray-500 w-4 h-4"></span>
                          ) : (
                            <span className="mb-0 text-sm mb-0 text-nowrap text-gray-500">
                              {FormatTime(order.confirmedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 p-2 flex flex-col justify-center">
                      <div className="relative flex items-center">
                        <div className="timeline-item-bar relative flex items-center">
                          <div
                            className={`icon-item icon-item-sm rounded-full p-2 border-4 z-10 ${
                              order_status[order.status] <
                              order_status["shipping"]
                                ? "border-gray-400 text-gray-400"
                                : "border-green-500 text-green-500"
                            }`}
                            data-bs-theme="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                              width="30px"
                              height="30px"
                              fill="currentColor"
                            >
                              <path
                                fill="currentColor"
                                d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                              />
                            </svg>
                            {/* <svg
                            className="svg-inline--fa fa-check text-white fs-10"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="check"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg=""
                            width="30px"
                            height="30px"
                            fill="currentColor"
                          >
                            <path
                              fill="currentColor"
                              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                            ></path>
                          </svg> */}
                          </div>
                        </div>
                        <div>
                          <span
                            className={`block h-[3px] ${
                              order_status[order.status] <
                              order_status["shipping"]
                                ? "bg-gray-400"
                                : "bg-green-500"
                            }`}
                            style={{
                              // position: "absolute",
                              // // left: "50%",
                              // transform: "translateX(-50%);",
                              // zIndex: 0,
                              width: "205px",
                            }}
                          ></span>
                        </div>
                      </div>
                      <div className="timeline-item-date text-end order-0 flex gap-3 items-center">
                        <div className="flex flex-col items-center">
                          <h4 className="text-sm font-semibold">
                            Đang giao hàng
                          </h4>
                          <span className="mb-0 text-sm mb-0 text-nowrap text-gray-500 w-4 h-4"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 p-2 flex flex-col justify-center">
                      <div className="relative flex">
                        <div className="timeline-item-bar relative flex items-center">
                          <div
                            className={`icon-item icon-item-sm rounded-full p-2 border-4 z-10 ${
                              order_status[order.status] <
                              order_status["shipped"]
                                ? "border-gray-400 text-gray-400"
                                : "border-green-500 text-green-500"
                            }`}
                            data-bs-theme="light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                              width="30px"
                              height="30px"
                              fill="currentColor"
                            >
                              <path
                                fill="currentColor"
                                d="M80 48a48 48 0 1 1 96 0A48 48 0 1 1 80 48zm64 193.7l0 65.1 51 51c7.1 7.1 11.8 16.2 13.4 26.1l15.2 90.9c2.9 17.4-8.9 33.9-26.3 36.8s-33.9-8.9-36.8-26.3l-14.3-85.9L66.8 320C54.8 308 48 291.7 48 274.7l0-88.1c0-32.4 26.2-58.6 58.6-58.6c24.1 0 46.5 12 59.9 32l47.4 71.1 10.1 5 0-76.2c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 76.2 10.1-5L473.5 160c13.3-20 35.8-32 59.9-32c32.4 0 58.6 26.2 58.6 58.6l0 88.1c0 17-6.7 33.3-18.7 45.3l-79.4 79.4-14.3 85.9c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l15.2-90.9c1.6-9.9 6.3-19 13.4-26.1l51-51 0-65.1-19 28.5c-4.6 7-11 12.6-18.5 16.3l-59.6 29.8c-2.4 1.3-4.9 2.2-7.6 2.8c-2.6 .6-5.3 .9-7.9 .8l-126.7 0c-2.5 .1-5-.2-7.5-.7c-2.9-.6-5.6-1.6-8.1-3l-59.5-29.8c-7.5-3.7-13.8-9.4-18.5-16.3l-19-28.5zM2.3 468.1L50.1 348.6l49.2 49.2-37.6 94c-6.6 16.4-25.2 24.4-41.6 17.8S-4.3 484.5 2.3 468.1zM512 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm77.9 348.6l47.8 119.5c6.6 16.4-1.4 35-17.8 41.6s-35-1.4-41.6-17.8l-37.6-94 49.2-49.2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item-date text-end order-0 flex gap-3 items-center">
                        <div className="flex flex-col items-center">
                          <h4 className="text-sm font-semibold">
                            Hoàn thành đơn hàng
                          </h4>
                          {order_status[order.status] <
                          order_status["completed"] ? (
                            <span className="mb-0 text-sm mb-0 text-nowrap text-gray-500 w-4 h-4"></span>
                          ) : (
                            <span className="mb-0 text-sm mb-0 text-nowrap text-gray-500">
                              {FormatTime(order.completedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="detail-header p-3 border-b-[1px] border-gray-300 pb-10">
            <h4 className="text-xl font-semibold mb-4">Địa chỉ nhận hàng</h4>
            <div className="grid grid-cols-6">
              <div className="col-span-2 grid grid-cols-2">
                <h2 className="col-span-1 text-base">Tên người nhận: </h2>
                <p className="col-span-1 mb-2 text-gray-600">{order.fullName}</p>

                <h2 className="col-span-1 text-base">Số Điện thoại: </h2>
                <p className="col-span-1 text-gray-600">{order.phoneNumber}</p>
              </div>
              <div className="col-span-2 grid grid-cols-2">
                <h2 className="col-span-1 text-base">Địa chỉ nhận hàng: </h2>
                <p className="col-span-1 mb-2 text-gray-600">{order.address + ' ' + order.province}</p>

                <h2 className="col-span-1 text-base">Ghi chú: </h2>
                <p className="col-span-1 text-gray-600">{order.additionalInformation}</p>
              </div>
            </div>
          </div>
          <div className="detail-product p-3 flex gap-10 items-center">
            <table
              className="table-fixed text-sm font-normal"
              style={{ width: "100%" }}
            >
              <thead className="hidden">
                <tr>
                  <th
                    className="sort white-space-nowrap align-middle"
                    scope="col"
                    style={{ width: "20px" }}
                  ></th>
                  <th
                    className="sort white-space-nowrap text-left"
                    scope="col"
                    style={{ width: "30%", minWidth: "250px" }}
                    data-sort="products"
                  ></th>
                  <th
                    className="sort text-start p-3"
                    scope="col"
                    data-sort="color"
                    style={{ width: "20%" }}
                  ></th>
                  <th
                    className="sort align-middle text-start asc"
                    scope="col"
                    data-sort="price"
                    style={{ width: "20%" }}
                  ></th>
                  <th
                    className="sort align-middle text-start asc"
                    scope="col"
                    data-sort="price"
                    style={{ width: "20%" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map((item) => {
                  return (
                    <tr className="border-b-[1px] border-gray-300">
                      <td className="text-center px-3 flex justify-center">
                        <a className="p-2" href="#">
                          <img
                            src={item.product.product_medias[0].url}
                            alt="Error!"
                            width="100"
                            className="rounded-lg p-3 border border-gray-300"
                          />
                        </a>
                      </td>
                      <td className="text-base">
                        <p className="line-clamp-3">{item.product.name}</p>
                      </td>
                      <td className="text-base px-3">
                        {item.product_variant != null
                          ? item.product_variant.variant_attributes
                              .map((attribute) => {
                                return attribute.value;
                              })
                              .join(", ")
                          : ""}
                      </td>
                      <td className="text-lg align-middle text-start asc px-3">
                        x{item.quantity}
                      </td>
                      <td className="px-3">
                        {!(item.discount === 0) ? (
                          <>
                            <h3 className="text-red-500 mb-0 text-base">
                              {formatMoney(item.product.regularPrice)}
                            </h3>
                          </>
                        ) : (
                          <>
                            <div className="flex gap-1">
                              <p className="me-2 mb-0 line-through text-gray-500 text-xs">
                                {formatMoney(item.product.regularPrice)}
                              </p>
                              <span className="text-red-500 text-xs">
                                {item.typeDiscount === "percent"
                                  ? `-${item.discount}%`
                                  : `-${formatMoney(item.discount)}`}
                              </span>
                            </div>
                            <h3 className="text-red-500 mb-0 text-base">
                              {item.typeDiscount === "percent"
                                ? formatMoney(
                                    item.product.regularPrice -
                                      (item.product.regularPrice *
                                        item.discount) /
                                        100
                                  )
                                : formatMoney(
                                    item.product.regularPrice - item.discount
                                  )}
                            </h3>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="detail-price flex justify-end p-3">
            <p className="text-base">
              Thành tiền:{" "}
              <span className="text-xl text-red-500">
                {formatMoney(order.total)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
