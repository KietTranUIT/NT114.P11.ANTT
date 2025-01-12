"use client";
import {
  formatMoney,
  getCart,
  updateCart,
  deleteCartItem,
} from "@/app/lib/helps";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";

const TableCart = () => {
  const { updateContextCart } = useCart();
  const [cart, setCart] = useState({ cart_items: [] });
  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
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
    const fetchCart = async () => {
      const httpRes = await getCart();
      if (httpRes.status != 500 && httpRes.status === 401) {
        window.location.href = "/login";
        return;
      }
      setCart(httpRes.data);
    };
    fetchCart();
  }, []);

  useEffect(() => {
    updateSummary();
  }, [cart]);

  const addItem = async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.dataset.itemId;
    const httpRes = await updateCart(cart.id, { itemId, quantity: 1 });
    if (httpRes.status === 200) {
      const itemQuantity = document.getElementById(`counter-input-${itemId}`);
      itemQuantity.value = parseInt(itemQuantity.value) + 1;
      let newCart = cart;
      for (let i = 0; i < newCart.cart_items.length; i++) {
        if (newCart.cart_items[i].id == itemId) {
          newCart.cart_items[i].quantity += 1;
          break;
        }
      }
      setCart(newCart);
      updateSummary();
      updateContextCart(1);
    }
  };

  const subtracItem = async (event) => {
    const itemId = event.currentTarget.dataset.itemId;
    const httpRes = await updateCart(cart.id, { itemId, quantity: -1 });
    if (httpRes.status === 200) {
      if (httpRes.data.message === "ok") {
        setCart((prevCart) => {
          let newCart = prevCart.cart_items.map((item) => {
            if (item.id != itemId) {
              return item;
            }
          });
          return newCart;
        });
        updateSummary();
      } else {
        const itemQuantity = document.getElementById(`counter-input-${itemId}`);
        itemQuantity.value = itemQuantity.value - 1;
        let newCart = cart;
        for (let i = 0; i < newCart.cart_items.length; i++) {
          if (newCart.cart_items[i].id == itemId) {
            newCart.cart_items[i].quantity -= 1;
            break;
          }
        }
        setCart(newCart);
        updateSummary();
        updateContextCart(-1);
      }
    }
  };

  // Delete a item
  const deleteItem = async (event) => {
    event.preventDefault();
    let quantity = 0;
    console.log(quantity);
    const itemId = event.currentTarget.dataset.itemId;
    console.log("item id = ", itemId);
    const httpRes = await deleteCartItem(cart.id, itemId);
    if (httpRes.status === 200) {
      setCart((prevCart) => {
        let newCart = prevCart.cart_items.map((item) => {
          if (item.id != itemId) {
            return item;
          }
          updateContextCart(-item.quantity);
        });
        newCart = newCart.filter((item) => item !== undefined);
        if (newCart.length <= 0) {
          newCart = { cart_items: [] };
        }
        return newCart;
      });
    }
  };
  return (
    <>
      <div className="container mx-auto p-3">
        <h2 className="text-3xl font-semibold mb-5">
          Cart
          <span> ({cart.cart_items.length})</span>
        </h2>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <table
              className="table-fixed text-sm font-normal"
              style={{ width: "100%" }}
            >
              <thead className="border-y-2 border-y-gray-200">
                <tr>
                  <th
                    className="sort white-space-nowrap align-middle p-3"
                    scope="col"
                    style={{ width: "10%" }}
                  ></th>
                  <th
                    className="sort white-space-nowrap text-left p-3 px-0"
                    scope="col"
                    style={{ width: "30%", minWidth: "250px" }}
                    data-sort="products"
                  >
                    Sản phẩm
                  </th>
                  <th
                    className="sort text-start p-3"
                    scope="col"
                    data-sort="color"
                    style={{ width: "20%" }}
                  >
                    Loại
                  </th>
                  <th
                    className="sort align-middle text-start asc p-3"
                    scope="col"
                    data-sort="price"
                    style={{ width: "20%" }}
                  >
                    Giá
                  </th>
                  <th
                    className="sort align-middle text-start asc p-3"
                    scope="col"
                    data-sort="price"
                    style={{ width: "15%" }}
                  >
                    Số lượng
                  </th>
                  <th
                    className="sort align-middle text-start asc p-3"
                    scope="col"
                    data-sort="price"
                    style={{ width: "20%" }}
                  >
                    Tổng
                  </th>
                  <th
                    className="sort text-center p-3"
                    scope="col"
                    style={{ width: "5%" }}
                  >
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.cart_items.map((item, index) => {
                  return (
                    <tr
                      className="mb-3 border-b-2 border-b-gray-200"
                      key={index}
                    >
                      <td className="text-center p-3">
                        <a className="" href={`/products/${item.product.slug}`}>
                          <img
                            src={item.product.product_medias[0].url}
                            alt=""
                            width="53"
                            className="border border-gray-300 rounded-lg"
                          />
                        </a>
                      </td>
                      <td className="p-3 ps-0 px-0">
                        <a
                          className="text-blue-500 hover:text-blue-700 line-clamp-2"
                          href={`/products/${item.product.slug}`}
                        >
                          {item.product.name}
                        </a>
                      </td>
                      <td className="p-3">
                        {item.product_variant != null
                          ? item.product_variant.variant_attributes
                              .map((attribute) => {
                                return attribute.value;
                              })
                              .join(", ")
                          : ""}
                      </td>
                      <td className="p-3 text-sm">
                        {/* {item.product_variant != null
                          ? item.product_variant.startSale != null &&
                            item.product_variant.endSale != null &&
                            new Date() >
                              new Date(item.product_variant.startSale) &&
                            new Date() < new Date(item.product_variant.endSale)
                            ? formatMoney(item.product_variant.salePrice)
                            : formatMoney(item.product_variant.regularPrice)
                          : item.product.startSale != null &&
                            item.product.endSale != null &&
                            new Date() > new Date(item.product.startSale) &&
                            new Date() < new Date(item.product.endSale)
                          ? formatMoney(item.product.salePrice)
                          : formatMoney(item.product.regularPrice)} */}
                        { formatMoney(item.product.regularPrice)}
                      </td>
                      <td>
                        <div className="flex gap-3 items-center p-3">
                          <div className="relative flex items-center">
                            <button
                              data-item-id={item.id}
                              onClick={subtracItem}
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="counter-input"
                              className="flex-shrink-0 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-2.5 h-2.5 text-black-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id={`counter-input-${item.id}`}
                              data-input-counter
                              className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                              placeholder=""
                              defaultValue={item.quantity}
                              onChange={() => {}}
                              required
                            />
                            <button
                              onClick={addItem}
                              data-item-id={item.id}
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="counter-input"
                              className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-2.5 h-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          {/* <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                width="15px"
                                height="15px"
                                fill="#8a94ad"
                              >
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="flex gap-1 text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                width="15px"
                                height="15px"
                                fill="white"
                              >
                                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                              </svg>
                              Add to cart
                            </button> */}
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        {item.product_variant != null
                          ? formatMoney(
                              item.product_variant.regularPrice * item.quantity
                            )
                          : formatMoney(
                              item.product.regularPrice * item.quantity
                            )}
                        {/* {item.product_variant != null
                          ? item.product_variant.startSale != null &&
                            item.product_variant.endSale != null &&
                            new Date() >
                              new Date(item.product_variant.startSale) &&
                            new Date() < new Date(item.product_variant.endSale)
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
                          ? formatMoney(item.product.salePrice * item.quantity)
                          : formatMoney(
                              item.product.regularPrice * item.quantity
                            )} */}
                      </td>
                      <td>
                        <button onClick={deleteItem} data-item-id={item.id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width="15px"
                            height="15px"
                            fill="#8a94ad"
                          >
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-span-1">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <div className="flex items-center justify-between mb-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Tổng kết
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
                  <h5 className="text-lg font-medium">Tổng :</h5>
                  <h5 className="text-lg font-medium">
                    {formatMoney(summary.subtotal)}
                  </h5>
                </div>
                <div className="flex justify-between mb-2">
                  <h5 className="text-lg font-medium">Giảm giá :</h5>
                  <h5 className="text-lg font-medium text-red-600">
                    -{formatMoney(summary.discount)}
                  </h5>
                </div>
                <div className="flex justify-between mb-2">
                  <h5 className="text-lg font-medium">Thuế :</h5>
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
                <h4 className="text-xl font-bold">Tổng thanh toán:</h4>
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
                  className="block text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default TableCart;
