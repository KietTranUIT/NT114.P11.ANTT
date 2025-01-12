"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorageWithTime } from "@/app/lib/helps";
import { getCart } from "../../../lib/helps";

// Tạo context
const CartContext = createContext();

// Provider để quản lý trạng thái giỏ hàng
export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchCart = async () => {
      let httpRes = await getCart();
      let cart = httpRes.data;
      if (cart) {
        let c = 0;
        cart.cart_items.forEach((item) => {
          c += item.quantity;
        });
        setCount(c);
      }
    };
    fetchCart()
    // const cart = getLocalStorageWithTime("cart");
    
  }, []);

  const updateContextCart = (number) => {
    setCount(count + number);
  };

  return (
    <CartContext.Provider value={{ count, updateContextCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng context
export const useCart = () => useContext(CartContext);
