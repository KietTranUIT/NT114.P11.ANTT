import axios from "axios";

// Generate a login request to server
export const login = async (user) => {
    try {
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            data: {
                type: "users",
                attributes: {
                    email: user.email,
                    password: user.password
                }
            }
        })
        return data
    } catch (error) {
        return error
    }
}

// Split access token and refresh token in response header
export   const getToken = async (authorization) => {
    let format = authorization.split(";")

    let accessToken = format[0].split("=")
    let refreshToken = format[1].split("=")
    return {
        accessToken: accessToken[1],
        refreshToken: refreshToken[1]
    }
}

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
}

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
    return formattedDate
}

// Fetch all categories
export const getCategories = async () => {
    try {
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
        return result.data
    } catch (error) {
        return error
    }
}

// Create a category
export const createCategory = async (category) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/categories`, category)
        return result.data
    } catch (error) {
        return error
    }
}

// Update a category
export const updateCategory = async (category) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/categories`, category)
        return result.data
    } catch (error) {
        return error
    }
}

// Remove a category
export const removeCategory = async (category) => {
    try {
        const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/categories`, category)
        return result.data
    } catch (error) {
        return error
    }
}