"use client";
import React, { useState } from "react";
import Modal from "./components/modal/modal";
import { login } from "../lib/helps";

const LoginForm = () => {
  // Is login fail
  const [isFailed, setIsFailed] = useState({
    status: false,
    title: "Đăng nhập thất bại",
    message: "",
  });
  const [params, setParams] = useState({ email: "", password: "" });

  // Hanlde login
  const handleLogin = async (event) => {
    event.preventDefault();
    const httpRes = await login(params);
    if (httpRes.status != 200) {
      // const errors = httpRes.response.data.errors
      // let message = ''
      // for (let i = 0; i < errors.length; i++) {
      //   message += `${errors[i].detail}`
      // }
      setIsFailed({
        title: "Đăng nhập thất bại",
        status: true,
        message:
          httpRes.status != 500
            ? "email hoặc mật khẩu không chính xác"
            : "lỗi server",
      });
      return;
    }
    const authorization = httpRes.headers["authorization"];
    let [tokenStr1, tokenStr2] = authorization.split(";");
    let accessToken = tokenStr1.split("=")[1];
    let refreshToken = tokenStr2.split("=")[1];

    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('user', JSON.stringify(httpRes.data.data))

    const date = new Date();
    date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
    document.cookie = `refresh_token=${refreshToken}; expires=${date.toUTCString()}; path=/; SameSite=Strict`;
    window.location.href = "/"
  };
  return (
    <>
      {isFailed.status ? (
        <Modal
          onClose={() => {
            setIsFailed(false);
          }}
          deactivate={false}
          title={isFailed.title}
          message={isFailed.message}
        />
      ) : (
        <></>
      )}
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(event) => {
              setParams({ ...params, email: event.target.value });
            }}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => {
              setParams({ ...params, password: event.target.value });
            }}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
