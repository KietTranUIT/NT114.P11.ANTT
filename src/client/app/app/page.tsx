import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Header from "./ui/components/header/header";
import NavBar from "./ui/components/navbar/navbar";
import Menu from "./ui/components/menu/menu";
import Advertisment from "./ui/components/advertisment/advertisment";
import Card from "./ui/components/card/card";
import Footer from "./ui/components/footer/footer";

export default function Page() {
  const product = {
    name: "San pham demo",
    image: "day chinh la image",
    rating: 5,
    price: 200,
  };
  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <Menu />
      <Advertisment />

      <div className="container mx-auto mt-20 grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <div className="flex justify-between mb-5">
            <div className="flex gap-2 items-center">
              <svg
                width="20px"
                height="20px"
                className="svg-inline--fa fa-bolt text-warning fs-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bolt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="#e5780b"
                  d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
                ></path>
              </svg>
              <h3 className="mx-2 text-xl font-bold">Top Deals today</h3>
              <svg
                width="20px"
                height="20px"
                className="svg-inline--fa fa-bolt text-warning fs-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bolt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="#e5780b"
                  d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
                ></path>
              </svg>
            </div>
            <a
              className="flex items-center text-sky-500 text-l font-bold"
              href="/"
            >
              Explore more
              <svg
                className="svg-inline--fa fa-chevron-right fs-9 ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                data-fa-i2svg=""
                width="20px"
                height="20px"
              >
                <path
                  fill="currentColor"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                ></path>
              </svg>
            </a>
          </div>
          <div>
            <div className="swiper-theme-container products-slider col-span-2">
              <div
                className="swiper theme-slider swiper-initialized swiper-horizontal swiper-backface-hidden"
                data-swiper='{"slidesPerView":1,"spaceBetween":16,"breakpoints":{"450":{"slidesPerView":2,"spaceBetween":16},"768":{"slidesPerView":3,"spaceBetween":20},"1200":{"slidesPerView":4,"spaceBetween":16},"1540":{"slidesPerView":5,"spaceBetween":16}}}'
              >
                <div className="grid grid-cols-4 gap-x-5">
                  {/* <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span> */}
                  {[1, 2, 3, 4].map((key, index) => {
                    return <Card product={product} />;
                  })}
                </div>
                {/* <div className="swiper-nav swiper-product-nav">
                  <div
                    className="swiper-button-next"
                    role="button"
                    aria-label="Next slide"
                    aria-controls="swiper-wrapper-67676b4dbeaf1f18"
                    aria-disabled="false"
                  >
                    <svg
                      className="svg-inline--fa fa-chevron-right nav-icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-right"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="swiper-button-prev swiper-button-disabled"
                    role="button"
                    aria-label="Previous slide"
                    aria-controls="swiper-wrapper-67676b4dbeaf1f18"
                    aria-disabled="true"
                  >
                    <svg
                      className="svg-inline--fa fa-chevron-left nav-icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-left"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                      ></path>
                    </svg>
                  </div>
                </div> */}
              </div>
              {/* <a className="fw-bold d-md-none px-0" href="#!">
                Explore more
                <svg
                  className="svg-inline--fa fa-chevron-right fs-9 ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  data-fa-i2svg=""
                  width="20px"
                  height="20px"
                >
                  <path
                    fill="currentColor"
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  ></path>
                </svg>
              </a> */}
            </div>
          </div>
        </div>
        <div className="bg-cover" style={{ backgroundColor: "white" }}>
          <div className="" style={{ width: "100%", height: "100%" }}>
            <div
              className="bg-cover"
              style={{
                backgroundImage: "url(/4.png)",
                height: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="col-span-4 mt-5">
          <div className="flex justify-between mb-5">
            <div className="flex gap-2 items-center">
              <h3 className="mx-2 text-xl font-bold">Top Electronics</h3>
            </div>
            <a
              className="flex items-center text-sky-500 text-l font-bold"
              href="/"
            >
              Explore more
              <svg
                className="svg-inline--fa fa-chevron-right fs-9 ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                data-fa-i2svg=""
                width="20px"
                height="20px"
              >
                <path
                  fill="currentColor"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                ></path>
              </svg>
            </a>
          </div>
          <div>
            <div className="swiper-theme-container products-slider col-span-2">
              <div
                className="swiper theme-slider swiper-initialized swiper-horizontal swiper-backface-hidden"
                data-swiper='{"slidesPerView":1,"spaceBetween":16,"breakpoints":{"450":{"slidesPerView":2,"spaceBetween":16},"768":{"slidesPerView":3,"spaceBetween":20},"1200":{"slidesPerView":4,"spaceBetween":16},"1540":{"slidesPerView":5,"spaceBetween":16}}}'
              >
                <div className="grid grid-cols-5 gap-x-5">
                  {/* <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span> */}
                  {[1, 2, 3, 4, 5].map((key, index) => {
                    return <Card product={product} />;
                  })}
                </div>
                {/* <div className="swiper-nav swiper-product-nav">
                  <div
                    className="swiper-button-next"
                    role="button"
                    aria-label="Next slide"
                    aria-controls="swiper-wrapper-67676b4dbeaf1f18"
                    aria-disabled="false"
                  >
                    <svg
                      className="svg-inline--fa fa-chevron-right nav-icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-right"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="swiper-button-prev swiper-button-disabled"
                    role="button"
                    aria-label="Previous slide"
                    aria-controls="swiper-wrapper-67676b4dbeaf1f18"
                    aria-disabled="true"
                  >
                    <svg
                      className="svg-inline--fa fa-chevron-left nav-icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-left"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                      ></path>
                    </svg>
                  </div>
                </div> */}
              </div>
              {/* <a className="fw-bold d-md-none px-0" href="#!">
                Explore more
                <svg
                  className="svg-inline--fa fa-chevron-right fs-9 ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  data-fa-i2svg=""
                  width="20px"
                  height="20px"
                >
                  <path
                    fill="currentColor"
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  ></path>
                </svg>
              </a> */}
            </div>
          </div>
        </div>
        <div className="col-span-4 mt-5">
          <div className="flex justify-between mb-5">
            <div className="flex gap-2 items-center">
              <h3 className="mx-2 text-xl font-bold">Best Offers</h3>
            </div>
            <a
              className="flex items-center text-sky-500 text-l font-bold"
              href="/"
            >
              Explore more
              <svg
                className="svg-inline--fa fa-chevron-right fs-9 ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                data-fa-i2svg=""
                width="20px"
                height="20px"
              >
                <path
                  fill="currentColor"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                ></path>
              </svg>
            </a>
          </div>
          <div>
            <div className="swiper-theme-container products-slider col-span-2">
              <div
                className="swiper theme-slider swiper-initialized swiper-horizontal swiper-backface-hidden"
                data-swiper='{"slidesPerView":1,"spaceBetween":16,"breakpoints":{"450":{"slidesPerView":2,"spaceBetween":16},"768":{"slidesPerView":3,"spaceBetween":20},"1200":{"slidesPerView":4,"spaceBetween":16},"1540":{"slidesPerView":5,"spaceBetween":16}}}'
              >
                <div className="grid grid-cols-5 gap-x-5">
                  {/* <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span> */}
                  {[1, 2, 3, 4, 5].map((key, index) => {
                    return <Card product={product} />;
                  })}
                </div>
                {/* <div className="swiper-nav swiper-product-nav">
                  <div
                    className="swiper-button-next"
                    role="button"
                    aria-label="Next slide"
                    aria-controls="swiper-wrapper-67676b4dbeaf1f18"
                    aria-disabled="false"
                  >
                    <svg
                      className="svg-inline--fa fa-chevron-right nav-icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-right"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="swiper-button-prev swiper-button-disabled"
                    role="button"
                    aria-label="Previous slide"
                    aria-controls="swiper-wrapper-67676b4dbeaf1f18"
                    aria-disabled="true"
                  >
                    <svg
                      className="svg-inline--fa fa-chevron-left nav-icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-left"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                      width="20px"
                      height="20px"
                    >
                      <path
                        fill="currentColor"
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                      ></path>
                    </svg>
                  </div>
                </div> */}
              </div>
              {/* <a className="fw-bold d-md-none px-0" href="#!">
                Explore more
                <svg
                  className="svg-inline--fa fa-chevron-right fs-9 ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  data-fa-i2svg=""
                  width="20px"
                  height="20px"
                >
                  <path
                    fill="currentColor"
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  ></path>
                </svg>
              </a> */}
            </div>
          </div>
        </div>
        {/* <div className="col-12 d-lg-none">
          <a href="#!">
            <img
              className="w-100 rounded-3"
              src="../../../assets/img/e-commerce/6.png"
              alt=""
            />
          </a>
        </div> */}
      </div>
      <Footer />
    </main>
  );
}
