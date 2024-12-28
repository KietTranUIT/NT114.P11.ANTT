"use client";
import { formatMoney } from "@/app/lib/helps";
import { useState } from "react";
import CountDown from "../countdown/countdown";

const Product = ({ product }) => {
  const [image, setImage] = useState(product.product_medias[0].url);
  const variantsMap = new Map();
  let attributes = new Map();

  const defineVariant = () => {
    let variants = product.product_variants;
    variants.map((variant) => {
      const key = variant.variant_attributes.map((att) => {
        if (!attributes.has(att.product_attribute.name)) {
          attributes.set(att.product_attribute.name, []);
        }
        let array = attributes.get(att.product_attribute.name);
        if (!array.includes(att.value)) {
          attributes.get(att.product_attribute.name).push(att.value);
        }
        return att.value;
      });
      variantsMap.set(key.join(","), variant.id);
    });
  };

  defineVariant();
  console.log(attributes);
  // const [variants, setVariant] = useState({})
  const changeImage = (event) => {
    setImage(event.target.value);
  };

  const changeOption = (event) => {
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div className="grid grid-cols-5">
              <div className="col-span-1">
                <div
                  className="swiper-wrapper flex flex-col overflow-y-scroll"
                  style={{ height: "450px" }}
                  id="swiper-wrapper-79054281d168bb2a"
                  aria-live="polite"
                >
                  {product.product_medias.map((media) => {
                    return (
                      <div
                        className="swiper-slide swiper-slide-visible swiper-slide-fully-visible"
                        role="group"
                        aria-label="3 / 3"
                        key={media.id}
                      >
                        <div className="product-thumb-container p-2 p-sm-3 p-xl-2">
                          {media.isMain ? (
                            <>
                              <input
                                type="radio"
                                id={`media-id${media.id}`}
                                name="image-main"
                                value={media.url}
                                className="hidden peer"
                                onChange={changeImage}
                                defaultChecked
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="radio"
                                id={`media-id${media.id}`}
                                name="image-main"
                                value={media.url}
                                className="hidden peer"
                                onChange={changeImage}
                              />
                            </>
                          )}
                          <label
                            htmlFor={`media-id${media.id}`}
                            className="inline-flex items-center justify-between p-2 border rounded-lg cursor-pointer border-gray-300 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600"
                          >
                            <img src={media.url} alt="" className="h-20" />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <span
                  className="swiper-notification"
                  aria-live="assertive"
                  aria-atomic="true"
                ></span>
              </div>
              <div className="col-span-4">
                <div className="h-100 p-2">
                  <div>
                    <div>
                      <div>
                        <img
                          src={image}
                          className="border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-5">
              <button
                type="button"
                className="font-semibold flex justify-center gap-4 items-center text-orange-700 hover:text-white border-2 border-orange-700 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  width="25px"
                  height="25px"
                >
                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </svg>
                Add to wishlist
              </button>
              <button
                type="button"
                className="flex justify-center gap-4 items-center text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-orange-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  width="25px"
                  height="25px"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="p-3">
              <div>
                <div className="flex gap-1">
                  <div className="me-2 flex text-orange-500">
                    {[1, 2, 3, 4, 5].map((key, index) => {
                      if (index < Math.round(product.rating)) {
                        return (
                          <svg
                            key={index}
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
                        >
                          <path
                            fill="currentColor"
                            d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                          ></path>
                        </svg>
                      );
                    })}
                  </div>
                  <p className="text-blue-400 font-semibold mb-2">
                    {product.product_reviews.length} People rated and reviewed{" "}
                  </p>
                </div>
                <h3 className="font-bold text-2xl line-clamp-3">
                  {product.name}
                </h3>
                <div className="mt-4">
                  <span className="bg-green-900 text-white text-sm font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-green-300">
                    #1 Best seller
                  </span>

                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    in Phoenix sell analytics 2021
                  </a>
                </div>
                <div className="mt-4 flex items-end">
                  {product.startSale != null &&
                  product.endSale != null &&
                  new Date() > new Date(product.startSale) &&
                  new Date() < new Date(product.endSale) ? (
                    <>
                      <h1 className="me-3 text-3xl font-bold">
                        {formatMoney(product.salePrice)}
                      </h1>
                      <p className="text-gray-500 text-xl line-through mb-0 me-3">
                        {formatMoney(product.regularPrice)}
                      </p>
                      {/* <p className="text-orange-400 font-bold text-2xl mb-0">
                        10% off
                      </p> */}
                    </>
                  ) : (
                    <>
                      <h1 className="me-3 text-3xl font-">
                        {formatMoney(product.regularPrice)}
                      </h1>
                    </>
                  )}
                </div>
                <p className="text-red-600 font-bold text-2xl mt-4">
                  {product.stock === 0 ? "Hết hàng" : "Còn hàng"}
                </p>
                {product.startSale != null &&
                product.endSale != null &&
                new Date() > new Date(product.startSale) &&
                new Date() < new Date(product.endSale) ? (
                  <CountDown endTime={new Date(product.endSale).getTime()} />
                ) : (
                  <></>
                )}
                <CountDown
                  endTime={new Date("2024-12-21T15:21:51Z").getTime()}
                />
                {Array.from(attributes).map((item) => {
                  return (
                    <div className="" key={item[0]}>
                      <p className="mb-2 text-base font-semibold">{item[0]}:</p>
                      <ul className="flex w-full gap-2 md:grid-cols-2">
                        {item[1].map((vl, index) => {
                          return (
                            <li
                              className="col-span-2 border"
                              key={`options-${item[0]}-${index}`}
                            >
                              {index === 0 ? (
                                <input
                                  type="radio"
                                  id={`variant-${item[0]}-${index}}`}
                                  name={`variant-${item[0]}}`}
                                  value={vl}
                                  className="hidden peer"
                                  onChange={changeOption}
                                  defaultChecked
                                />
                              ) : (
                                <input
                                  type="radio"
                                  id={`variant-${item[0]}-${index}}`}
                                  name={`variant-${item[0]}}`}
                                  value={vl}
                                  className="hidden peer"
                                  onChange={changeOption}
                                />
                              )}
                              <label
                                htmlFor={`variant-${item[0]}-${index}}`}
                                className="inline-flex items-center justify-between w-full p-2 bg-white border border-gray-300 rounded-lg cursor-pointer border peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                              >
                                {vl}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
