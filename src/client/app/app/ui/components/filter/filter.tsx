const Filter = () => {
  return (
    <>
      <div className="overflow-auto" style={{height:"100vh"}}>
        <div className="mb-5">
          <h3 className="text-2xl font-bold">Filters</h3>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Availability</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Color family</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Brands</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
        <a href="#" className="mb-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Price range</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div className="mb-3">
          <div className="flex justify-between mb-5">
            <div className="input-group me-2 flex">
              <div>
                <input
                  style={{ width: "120px" }}
                  type="text"
                  id="first_name"
                  className="border border-gray-300 text-gray-900 text-sm rounded-l-lg"
                  placeholder="Min"
                  required
                />
              </div>
              <div>
                <input
                  style={{ width: "120px" }}
                  type="text"
                  id="first_name"
                  className="border border-gray-300 text-gray-900 text-sm rounded-r-lg"
                  placeholder="Max"
                  required
                />
              </div>
            </div>
            <button className="text-sky-500 font-semibold" type="button">
              Go
            </button>
          </div>
        </div>
        <a href="#" className="mb-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Rating</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div style={{color:"#e5780b"}}>
          <div className="flex items-center mb-1">
            <input
              className="form-check-input me-3"
              id="flexRadio1"
              type="radio"
              name="flexRadio"
            />
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
          </div>
          <div className="flex items-center mb-1">
            <input
              className="form-check-input me-3"
              id="flexRadio2"
              type="radio"
              name="flexRadio"
            />
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
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
            <p className="ms-1 mb-0" style={{color:"black"}}>&amp; above</p>
          </div>
          <div className="flex items-center mb-1">
            <input
              className="form-check-input me-3"
              id="flexRadio3"
              type="radio"
              name="flexRadio"
            />
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
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
            <p className="ms-1 mb-0" style={{color:"black"}}>&amp; above </p>
          </div>
          <div className="flex items-center mb-1">
            <input
              className="form-check-input me-3"
              id="flexRadio4"
              type="radio"
              name="flexRadio"
            />
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
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
            <p className="ms-1 mb-0" style={{color:"black"}}>&amp; above</p>
          </div>
          <div className="flex items-center mb-3">
            <input
              className="form-check-input me-3"
              id="flexRadio5"
              type="radio"
              name="flexRadio"
            />
            <svg
              className="svg-inline--fa fa-star text-warning fs-9 me-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
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
            <p className="ms-1 mb-0" style={{color:"black"}}>&amp; above </p>
          </div>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Availability</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Availability</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Availability</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="font-semibold mb-3">Availability</div>
            <svg
              className="svg-inline--fa fa-angle-down toggle-icon text-body-quaternary"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-down"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20px"
              height="20px"
            >
              <path
                fill="currentColor"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </a>
        <div>
          <div className="mb-2">
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="inStockInput"
                type="checkbox"
                name="color"
                checked={true}
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="inStockInput"
              >
                In stock
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="preBookInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="preBookInput"
              >
                Pre-book
              </label>
            </div>
            <div className="form-check mb-0 flex items-center gap-3">
              <input
                className="form-check-input mt-0"
                id="outOfStockInput"
                type="checkbox"
                name="color"
              />
              <label
                className="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0"
                htmlFor="outOfStockInput"
              >
                Out of stock
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
