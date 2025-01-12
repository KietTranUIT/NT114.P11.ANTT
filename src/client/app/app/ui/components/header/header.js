"use client";
import SearchInput from "../search/search";
import { useEffect, useState } from "react";
import { getLocalStorageWithTime } from "@/app/lib/helps";
import { useCart } from "../context/cartContext";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const { count } = useCart()
  useEffect(() => {
    const user = getLocalStorageWithTime("user");
    if (user) {
      setUser(user);
      setAuthenticated(true);
    }
  }, []);
  return (
    <>
      <div className="bg-orange-400">
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-2.5">
            <div className="logo flex items-center">
              <a href="/" className="text-xl font-bold flex gap-1">
                {/* <img src="/logo.png" alt="phoenix" width="27" /> */}
                <h1 className="text-white">TechStore</h1>
              </a>
            </div>
            <SearchInput />
            <div className="user-actions flex items-center gap-5">
              <div className="flex gap-2 items-center">
                <a
                  type="button"
                  href="/account/cart"
                  className="relative p-1 inline-flex items-center text-sm font-medium text-center text-gray-600 rounded-lg"
                >
                  <svg
                    className="w-[23px] h-[23px]"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                  <span className="sr-only">Notifications</span>
                  <div className="absolute p-2 inline-flex items-center justify-center w-[20px] h-[20px] text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">
                    { count }
                  </div>
                </a>
                <a href="/account/cart" className="text-sm font-semibold">
                  Giỏ hàng
                </a>
              </div>

              <a
                href="/account/profile"
                className="flex items-center justify-center gap-2 text-sm text-gray-600"
              >
                <svg
                  width="21"
                  height="21"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <span className="text-gray-900 font-semibold">
                  {authenticated ? `${user.fullName}` : "Đăng nhập"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
