"use client";
import { useState, MouseEvent } from "react";
import { register } from "../lib/helps";
const RegisterForm = () => {
  const [formInput, setFormInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Hanlde login
  const handleRegister = async (event) => {
    event.preventDefault();
    let params = { ...formInput };
    const httpRes = await register(params);
    console.log(httpRes)
    if (httpRes.status === 201) {
      window.location.href = "login";
    }
  };
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Họ và Tên:
        </label>
        <input
          onChange={(event) => {
            setFormInput({ ...formInput, fullName: event.target.value });
          }}
          type="text"
          id="username"
          name="username"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          onChange={(event) => {
            setFormInput({ ...formInput, email: event.target.value });
          }}
          type="text"
          id="email"
          name="email"
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
          onChange={(event) => {
            setFormInput({ ...formInput, password: event.target.value });
          }}
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password:
        </label>
        <input
          onChange={(event) => {
            setFormInput({ ...formInput, confirmPassword: event.target.value });
          }}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        />
      </div>
      <div>
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
