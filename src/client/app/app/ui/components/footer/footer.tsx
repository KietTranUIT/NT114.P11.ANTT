const Footer = () => {
  return (
    <div className="bg-zinc-200 mt-5">
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center mb-3">
              <img src="/logo.png" alt="phoenix" width="27" />
              <h5 className="logo-text ms-2 font-bold text-xl">TechStore</h5>
            </div>
            <p className="text-xs lh-sm fs-9">
              Phoenix is an admin dashboard template with fascinating features
              and amazing layout. The template is responsive to all major
              browsers and is compatible with all available devices and screen
              sizes.
            </p>
          </div>
          <div className="col-span-3 flex justify-between">
            <div className="col-6 col-md-auto">
              <h5 className="font-bold text-base mb-3">About Phoenix</h5>
              <div className="flex flex-col justify-between text-xs">
                <a
                  className="text-body-tertiary text-xs mb-1"
                  href="#!"
                >
                  Careers
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Affiliate Program
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Privacy Policy
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Terms &amp; Conditions
                </a>
              </div>
            </div>
            <div className="col-6 col-md-auto">
              <h5 className="font-bold text-base mb-3">Stay Connected</h5>
              <div className="flex flex-col text-xs">
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Blogs
                </a>
                <a className="mb-1 flex items-center" href="#!">
                  <svg
                    className="svg-inline--fa fa-square-facebook text-primary me-2 fs-8"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="square-facebook"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                    width="20px"
                    height="20px"
                  >
                    <path
                      fill="currentColor"
                      d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
                    ></path>
                  </svg>
                  <span className="text-body-secondary">Facebook</span>
                </a>
                <a className="mb-1 flex items-center" href="#!">
                  <svg
                    className="svg-inline--fa fa-square-twitter text-info me-2 fs-8"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="square-twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                    width="20px"
                    height="20px"
                  >
                    <path
                      fill="currentColor"
                      d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z"
                    ></path>
                  </svg>
                  <span className="text-body-secondary">Twitter</span>
                </a>
              </div>
            </div>
            <div className="col-6 col-md-auto">
              <h5 className="font-bold text-base mb-3">Customer Service</h5>
              <div className="flex flex-col text-xs">
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Help Desk
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Support, 24/7
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Community of Phoenix
                </a>
              </div>
            </div>
            <div className="col-6 col-md-auto">
              <h5 className="font-bold text-base mb-3">Payment Method</h5>
              <div className="flex flex-col text-xs">
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Cash on Delivery
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Online Payment
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  PayPal
                </a>
                <a
                  className="text-body-tertiary fw-semibold fs-9 mb-1"
                  href="#!"
                >
                  Installment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
