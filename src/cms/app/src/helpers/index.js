import axios from "axios";

// Generate a login request to server
export const login = async (user) => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            email: user.email,
            password: user.password
        })
        return data
    } catch (error) {
        return error
    }
}

// Split access token and refresh token in response header
export const getToken = async (authorization) => {
    let format = authorization.split(";")

    let accessToken = format[0].split("=")
    let refreshToken = format[1].split("=")
    return {
        accessToken: accessToken[1],
        refreshToken: refreshToken[1]
    }
}