"use client";
import Header from "@/app/ui/components/header/header";
import NavBar from "@/app/ui/components/navbar/navbar";
import Footer from "@/app/ui/components/footer/footer";
import Order from "@/app/ui/components/order/order";
import { getOrder } from "@/app/lib/helps";
import { useEffect, useState } from "react";
import { formatMoney } from "@/app/lib/helps";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState("all");
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notCompletedOrders, setNotCompletedOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const httpRes = await getOrder();
      if (httpRes.data) {
        let order1 = [];
        let order2 = [];
        httpRes.data.map((order, index) => {
          if (order.status === "completed") {
            order1.push(order);
          } else {
            order2.push(order);
          }
        });
        setCompletedOrders(order1);
        setNotCompletedOrders(order2);
        console.log(httpRes.data);
        setOrders(httpRes.data);
      }
    };
    fetchData();
  }, []);

  const renderStatusOrder = (order) => {
    if (order.status === "shipping") {
      return "Đang giao hàng";
    } else if (order.status === "confirmed") {
      return "Đơn hàng đã xác nhận";
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
  useEffect(() => {
    const fetchData = async () => {
      let httpRes;
      if (currentPage === "all") {
        httpRes = await getOrder();
      } else {
        httpRes = await getOrder({ status: currentPage });
      }
      setOrders(httpRes.data);
    };
    fetchData();
  }, [currentPage]);
  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <div className="container mx-auto" style={{ minHeight: "80vh" }}>
        <nav>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setCurrentPage("all");
                    }}
                    className={`block py-2 px-3 md:p-0 rounded md:bg-transparent ${
                      currentPage === "all"
                        ? "md:text-blue-500"
                        : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                    }`}
                    aria-current="page"
                  >
                    Tất cả
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setCurrentPage("checkout");
                    }}
                    className={`block py-2 px-3 md:p-0 text-gray-900 rounded ${
                      currentPage === "checkout"
                        ? "md:text-blue-500"
                        : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                    }`}
                  >
                    Chờ thanh toán
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault;
                      setCurrentPage("shipping");
                    }}
                    className={`block py-2 px-3 md:p-0 text-gray-900 rounded ${
                      currentPage === "shipping"
                        ? "md:text-blue-500"
                        : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                    }`}
                  >
                    Đang vận chuyển
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault;
                      setCurrentPage("completed");
                    }}
                    className={`block py-2 px-3 md:p-0 text-gray-900 rounded ${
                      currentPage === "completed"
                        ? "md:text-blue-500"
                        : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                    }`}
                  >
                    Hoàn thành
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex flex-col gap-5">
          {orders.length === 0 ? (
            <h2 className="text-base">Không có đơn hàng nào.</h2>
          ) : (
            <>
              {orders.map((order) => {
                return (
                  <div className="bg-white">
                    <div className="detail-header flex items-center justify-between p-3 border-b-[1px] border-gray-300">
                      <h4 className="text-lg font-semibold">
                        Đơn hàng{" "}
                        <a href={`/account/orders/${order.id}/`}>#{order.id}</a>
                      </h4>
                      <span className="font-semibold text-lg text-red-500">
                        {renderStatusOrder(order)}
                      </span>
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
                                  <p className="line-clamp-3">
                                    {item.product.name}
                                  </p>
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
                                          {formatMoney(
                                            item.product.regularPrice
                                          )}
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
                                              item.product.regularPrice -
                                                item.discount
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
                );
              })}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TrackOrder;
