"use client";
import { useState, useEffect } from "react";
import Card from "../card/card";
import { getProducts } from "@/app/lib/helps";

const RecommendProduct = ({ productlist }) => {
  const [products, setProducts] = useState([]);
  const maxShow = 5;
  const [area, setArea] = useState({ start: 0, end: maxShow - 1 });
  useEffect(() => {
    const fetchData = async () => {
      const httpRes = await getProducts({ list: productlist });
      setArea({
        start: 0,
        end:
          httpRes.data.length < maxShow ? httpRes.data.length - 1 : maxShow - 1,
      });
      setProducts(httpRes.data);
    };
    fetchData();
  }, []);
  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative h-[450px] overflow-hidden rounded-lg">
        <div className="duration-700 ease-in-out" data-carousel-item>
          <div className="font-semibold text-xl px-4 pt-4 rounded-lg flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width={30}
              height={30}
              fill="orange"
            >
              <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
            </svg>
            Sản phẩm liên quan
          </div>
          <div className="grid grid-cols-5 gap-x-5 p-4">
            {products.map((product, index) => {
              if (index >= area.start && index <= area.end) {
                return <Card product={product} key={index} />;
              }
            })}
          </div>
        </div>
        <div
          className="hidden duration-700 ease-in-out"
          data-carousel-item="active"
        >
          <img
            src="/docs/images/carousel/carousel-2.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-3.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-4.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-5.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setArea({ start: area.start - 1, end: area.end - 1 });
        }}
        className={`absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none ${
          area.start === 0 ? "hidden" : ""
        }`}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => {
          setArea({ start: area.start + 1, end: area.end + 1 });
        }}
        className={`absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none ${
          area.end === products.length - 1 ? "hidden" : ""
        }`}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default RecommendProduct;
