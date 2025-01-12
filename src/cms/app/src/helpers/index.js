import axios from "axios";

// Get orders
export const getOrders = async (params) => {
  try {
    const access_token = getLocalStorageWithTime("access_token");
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/orders`,
      {
        params,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const saveToLocalStorage = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Get access token from local storage
export const getLocalStorageWithTime = (key) => {
  const now = new Date();
  const data = localStorage.getItem(key);
  if (!data) {
    return undefined;
  }
  const itm = JSON.parse(data);
  if (now.getTime() > itm.expiry) {
    return undefined;
  }
  return itm.value;
};

export const validateToken = async (params) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/auth`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

// Generate a login request to server
export const login = async (user) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        email: user.email,
        password: user.password,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

// Split access token and refresh token in response header
export const getToken = async (authorization) => {
  let format = authorization.split(";");

  let accessToken = format[0].split("=");
  let refreshToken = format[1].split("=");
  return {
    accessToken: accessToken[1],
    refreshToken: refreshToken[1],
  };
};

// Generate array days
export const generateDayArray = (dateRange) => {
  // Extract month, start day, end day, and year from the string
  const regex = /([A-Za-z]+) (\d+) - (\d+), (\d{4})/;
  const match = dateRange.match(regex);

  if (match) {
    const month = match[1];
    const startDay = parseInt(match[2], 10);
    const endDay = parseInt(match[3], 10);

    const dates = [];

    // Loop through the range and generate formatted dates
    for (let day = startDay; day <= endDay; day++) {
      const formattedDay = day < 10 ? `0${day}` : day; // Ensure day is 2 digits (e.g., "01", "02", ...)
      dates.push(`${formattedDay} ${month}`);
    }

    return [match[0], dates];
  } else {
    return [];
  }
};

export const formatTimeStamp = (timeStr) => {
  const date = new Date(timeStr);
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

// Fetch all categories
export const getCategories = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/categories`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Create a category
export const createCategory = async (category) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/categories`,
      category
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Update a category
export const updateCategory = async (categoryId, params) => {
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/categories/${categoryId}`,
      params
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Remove a category
export const removeCategory = async (categoryId) => {
  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/categories/${categoryId}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

// Remove multiple category
export const removeCategories = async (selected) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/categories/delete`,
      { selected }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// Get a detail category
export const getCategory = async (categoryId) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/categories/${categoryId}`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Search category
export const searchCategory = async (params) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/categories/search?name=${params}`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get brands
export const getBrands = async (params) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/brands?page=${params.page}&limit=${params.limit}`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get all brands version 2
export const getBrandsV2 = async (params) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/brands`,
      {
        params,
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get total brands
export const getTotalBrands = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/brands/total`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Search brand
export const searchBrand = async (params) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/brands/search?name=${params}`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Remove brand
export const deleteBrand = async (brandId) => {
  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/brands/${brandId}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

// Remove brands
export const deleteBrands = async (selected) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/brands/delete`,
      { selected }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// Create a brand
export const createBrand = async (brand) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/brands`,
      brand,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get a detailed brand
export const getBrand = async (brandId) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/brands/${brandId}`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Update a brand
export const updateBrand = async (brandId, params) => {
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/brands/${brandId}`,
      params
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

export const updateLogoBrand = async (brandId, data) => {
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/brands/${brandId}/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get all product attributes
export const getProductAttributes = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/attributes/`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Create a product
export const createProduct = async (formData) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/products`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (formData) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/products/uploadimage`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

export const deleteImage = async (id) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/products/deleteimage`,
      { id }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get all tags
export const getTags = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/tags`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Get all brands version 2
export const getProducts = async (params) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products`,
      {
        params,
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getDetailProduct = async (params) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/${params.id}`
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

// Format to VND
export const formatToVNDCustom = (amount) => {
  return (
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + " VND"
  );
};

export function formatDateTime(date) {
  // Kiểm tra nếu date không phải là đối tượng Date hợp lệ
  if (!(date instanceof Date)) {
      date = new Date(date);
  }

  // Lấy ngày, tháng, năm, giờ, phút, giây
  const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 vào trước nếu ngày < 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm số 0 vào trước nếu tháng < 10
  const year = String(date.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Trả về chuỗi thời gian theo định dạng dd/mm/yy hh:mm:ss
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const updateProduct = async (productId, params) => {
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
      params
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getReview = async () => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/reviews`,
    );
    return data;
  } catch (error) {
    return error;
  }
};
