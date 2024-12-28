import axios from "axios";

// Format number to money
export const formatMoney = (number) => {
  const formattedNumberNoDecimal =
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number) + " VND";
  return formattedNumberNoDecimal;
};

// Convert time string to date time
export const convertDateTime = (timeStr) => {
  const timeToCompare = new Date(timeStr.replace(" ", "T"));
  return timeToCompare;
};

// -------------------------------- CALL API -------------------------------- //
// Get products
export const getProducts = async (params) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
      { params }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// Login
export const login = async (params) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
      { ...params }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Get detail information of a product
export const getProduct = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// Get cart user
export const getCart = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateCart = async (cartId, params) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${cartId}`,
      { ...params },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteCartItem = async (cartId, itemId) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          itemId,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Get all address of a user
export const getAddresses = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addresses/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Update user address
export const updateAddressAPI = async (addressId, params) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addresses/${addressId}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Delete user address
export const deleteAddress = async (addressId) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addresses/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Add address
export const createAddress = async (params) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addresses/`,
      { ...params },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Get all address of a user
export const getDeliveries = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/shipping/`
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Get list coupons
export const getCoupons = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupons/`,{
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const payment = async (params) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/`,
      { ...params },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}
