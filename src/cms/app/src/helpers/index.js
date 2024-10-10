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