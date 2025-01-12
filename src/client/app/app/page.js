import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Header from "./ui/components/header/header";
import NavBar from "./ui/components/navbar/navbar";
import Menu from "./ui/components/menu/menu";
import Advertisment from "./ui/components/advertisment/advertisment";
import Card from "./ui/components/card/card";
import Footer from "./ui/components/footer/footer";
import { getProducts } from "./lib/helps";

export default async function Page() {
  let httpRes = await getProducts({ view: "top" });
  let recommendations = httpRes.data;

  httpRes = await getProducts({ view: "sale" });
  let sales = httpRes.data;

  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <Menu />
      <Advertisment />

      <div className="container mx-auto mt-20 grid grid-cols-4 gap-5">
        <div className="col-span-4">
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
                  fill="#ef4444"
                  d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
                ></path>
              </svg>
              <h3 className="mx-2 text-2xl font-bold text-red-500">
                Sản phẩm đang khuyến mãi
              </h3>
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
                  fill="#ef4444"
                  d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <div className="swiper-theme-container products-slider col-span-2">
              <div
                className="swiper theme-slider swiper-initialized swiper-horizontal swiper-backface-hidden"
                data-swiper='{"slidesPerView":1,"spaceBetween":16,"breakpoints":{"450":{"slidesPerView":2,"spaceBetween":16},"768":{"slidesPerView":3,"spaceBetween":20},"1200":{"slidesPerView":4,"spaceBetween":16},"1540":{"slidesPerView":5,"spaceBetween":16}}}'
              >
                <div className="grid grid-cols-5 gap-x-7 gap-y-7">
                  {sales.map((product, index) => {
                    return <Card product={product} key={index} />;
                  })}
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="col-span-4 mt-5">
          <div className="flex justify-between mb-5">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width={30}
                height={30}
                fill="#ffe210"
              >
                <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z" />
              </svg>
              <h3 className="mx-2 text-2xl font-bold">Gợi ý cho bạn</h3>
            </div>
          </div>
          <div>
            <div className="swiper-theme-container products-slider col-span-2">
              <div
                className="swiper theme-slider swiper-initialized swiper-horizontal swiper-backface-hidden"
                data-swiper='{"slidesPerView":1,"spaceBetween":16,"breakpoints":{"450":{"slidesPerView":2,"spaceBetween":16},"768":{"slidesPerView":3,"spaceBetween":20},"1200":{"slidesPerView":4,"spaceBetween":16},"1540":{"slidesPerView":5,"spaceBetween":16}}}'
              >
                <div className="grid grid-cols-5 gap-x-7 gap-y-7 mb-10">
                  {recommendations.map((product, index) => {
                    return <Card product={product} key={index} />;
                  })}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
