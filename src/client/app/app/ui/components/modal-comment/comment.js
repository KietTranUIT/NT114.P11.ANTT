"use client";
import { reviewProduct } from "@/app/lib/helps";
import { useState } from "react";
const ModalContent = ({ product }) => {
  const [review, setReview] = useState({ rating: 5, content: "" });
  const handleReview = async () => {
    const httpRes = await reviewProduct(product.id, review);
    if (httpRes.stauts === 401) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này");
      window.location.href = "/login";
      return;
    }

    window.location.reload();
  };
  const onClose = () => {
    const modal = document.getElementById("modal-comment");
    modal.classList.add("hidden");
  };
  return (
    <>
      <div
        className="relative z-10 hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        id="modal-comment"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div
          tabIndex="-1"
          className="flex item-centers justify-center mt-10 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-lg max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl text-center font-bold text-gray-900">
                  Đánh giá sản phẩm
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="medium-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <img
                    src={product.product_medias[0].url}
                    width={"100px"}
                    height={"100px"}
                  />

                  <h2 className="font-semibold text-base">{product.name}</h2>

                  <div className="flex gap-3" style={{ color: "#e5780b" }}>
                    {[1, 2, 3, 4, 5].map((key, index) => {
                      if (index < Math.round(review.rating)) {
                        return (
                          <a
                            key={key}
                            href="#"
                            onClick={(event) => {
                              event.preventDefault;
                              setReview({ ...review, rating: key });
                            }}
                          >
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
                              width="30px"
                              height="30px"
                            >
                              <path
                                fill="currentColor"
                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                              ></path>
                            </svg>
                          </a>
                        );
                      }
                      return (
                        <a
                          href="#"
                          onClick={(event) => {
                            event.preventDefault;
                            setReview({ ...review, rating: key });
                          }}
                          key={key}
                        >
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
                            width="30px"
                            height="30px"
                          >
                            <path
                              fill="currentColor"
                              d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                            ></path>
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-5">
                  <textarea
                    id="message"
                    rows="4"
                    className=" mt-7 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mời bạn chia sẻ thêm cảm nhận..."
                    onChange={(event) => {
                      setReview({ ...review, content: event.target.value });
                    }}
                  ></textarea>
                </div>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="p-2 md:p-5">
                <button
                  data-modal-hide="medium-modal"
                  type="button"
                  className="text-white p-4 text-base bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 text-center"
                  style={{ width: "100%" }}
                  onClick={handleReview}
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalContent;
// fixed inset-0 bg-gray-500/75 transition-opacity
