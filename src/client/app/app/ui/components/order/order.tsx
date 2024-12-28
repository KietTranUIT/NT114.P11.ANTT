"use client";
import dynamic from "next/dynamic";
const OpenStreetMap = dynamic(() => import("@/app/ui/components/openmap/map"), {
  ssr: false,
});
const Order = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between mb-5">
          <div>
            <h2 className="text-4xl font-bold">Order #234 status</h2>
            <p>
              {" "}
              Payment via{" "}
              <a className="text-blue-500 hover:text-blue-700 font-bold">
                Cash on delivery
              </a>
              , <span>Nov 12, 2021, 8:54AM.</span>
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-3 font-bold text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 mt-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="17px"
              height="17px"
              fill="currentColor"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            Call support
          </button>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">{/* <OpenStreetMap /> */}</div>
          <div className="col-span-1">
            <div>
              <div>
                <div>
                <div className="grid grid-cols-5 mb-32">
                    <div className="col-span-1 flex items-center">
                      <div className="timeline-item-date text-end order-0 order-md-0 me-5">
                        <p className="text-xs font-semibold mb-0 text-nowrap text-gray-500">
                          23 August, 2023
                          <br className="d-none d-md-block" /> 10:30 AM
                        </p>
                      </div>
                      <div className="timeline-item-bar relative me-3 me-md-0 flex flex-col">
                        <div
                          className="icon-item icon-item-sm rounded-full p-1 bg-green-500 z-10"
                          data-bs-theme="light"
                        >
                          <svg
                            className="svg-inline--fa fa-check text-white fs-10"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="check"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg=""
                            width="20px"
                            height="20px"
                            fill="currentColor"
                          >
                            <path
                              fill="currentColor"
                              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                            ></path>
                          </svg>
                        </div>
                        <span className="block w-[1px] bg-green-500 absolute" style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%);",
                            zIndex:0,
                            height: "170px"
                        }}></span>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="timeline-item-content ps-6 ps-md-3">
                        <h4 className="text-xl font-semibold">Order is processing</h4>
                        <p className="mb-0 text-xs font-semibold mb-0 text-nowrap text-gray-500">
                          Your package is ready for the seller to prepare.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 mb-32">
                    <div className="col-span-1 flex items-center">
                      <div className="timeline-item-date text-end order-0 order-md-0 me-5">
                        <p className="text-xs font-semibold mb-0 text-nowrap text-gray-500">
                          23 August, 2023
                          <br className="d-none d-md-block" /> 10:30 AM
                        </p>
                      </div>
                      <div className="timeline-item-bar relative me-3 me-md-0">
                        <div
                          className="icon-item icon-item-sm rounded-full p-1 bg-green-500 z-10"
                          data-bs-theme="light"
                        >
                          <svg
                            className="svg-inline--fa fa-check text-white fs-10"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="check"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg=""
                            width="20px"
                            height="20px"
                            fill="currentColor"
                          >
                            <path
                              fill="currentColor"
                              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                            ></path>
                          </svg>
                        </div>
                        <span className="block w-[1px] bg-green-500 absolute" style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%);",
                            zIndex:0,
                            height: "170px"
                        }}></span>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="timeline-item-content ps-6 ps-md-3">
                        <h4 className="text-xl font-semibold">Order is processing</h4>
                        <p className="mb-0 text-xs font-semibold mb-0 text-nowrap text-gray-500">
                          Your package is ready for the seller to prepare.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 mb-32">
                    <div className="col-span-1 flex items-center">
                      <div className="timeline-item-date text-end order-0 order-md-0 me-5">
                        <p className="text-xs font-semibold mb-0 text-nowrap text-gray-500">
                          23 August, 2023
                          <br className="d-none d-md-block" /> 10:30 AM
                        </p>
                      </div>
                      <div className="timeline-item-bar relative me-3 me-md-0">
                        <div
                          className="icon-item icon-item-sm rounded-full p-1 bg-green-500 z-10"
                          data-bs-theme="light"
                        >
                          <svg
                            className="svg-inline--fa fa-check text-white fs-10"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="check"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg=""
                            width="20px"
                            height="20px"
                            fill="currentColor"
                          >
                            <path
                              fill="currentColor"
                              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                            ></path>
                          </svg>
                        </div>
                        <span className="block w-[1px] bg-green-500"></span>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="timeline-item-content ps-6 ps-md-3">
                        <h4 className="text-xl font-semibold">Order is processing</h4>
                        <p className="mb-0 text-xs font-semibold mb-0 text-nowrap text-gray-500">
                          Your package is ready for the seller to prepare.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
