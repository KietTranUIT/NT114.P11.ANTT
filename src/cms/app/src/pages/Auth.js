import { useState } from 'react';
import { login, getToken } from './../helpers';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Auth() {
    const userInfos = {
        email: "",
        password: "",
    };

    const notifications = {
        message: "",
        type: "",
        visible: false,
    }
    const [user, setUser] = useState(userInfos)
    const [notify, setNotify] = useState(notifications)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Update user state when user enter text in input
    const handleInputChanges = (event) => {
        const { name, value } = event.target
        setUser({...user, [name]: value})
    }

    // Show notification
    const showNotification = (message, type) => {
        // Set up visible is true
        setNotify({message: message, type: type, visible: true})

        // Automaticly hidden notification
        setTimeout(() => {
            setNotify({...notify, visible: false})
        }, 4000)
    }

    // Close notification
    const closeNotification = () => {
        setNotify({...notify, visible: false})
    }

    // Send login request
    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
        try {
            const response = await login(user)
            if (response instanceof Error) {
                showNotification('Email hoặc mật khẩu không chính xác!', 'error')
                throw new Error('')
            }

            // Save token in authorization
            const authorization = response.headers['authorization']
            const token = getToken(authorization)
            Cookies.set("access_token", token.accessToken, { 
                expires: 1 / 24,
                sameSite: 'Strict'
            })
            Cookies.set("refresh_token", token.refreshToken, {
                path: "/users/refresh",
                expires: 7,
                samesite: 'Strict'
            })
            localStorage.setItem('user', JSON.stringify(response.data.data.attributes))

            dispatch({type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user'))})

            showNotification('Đăng nhập thành công!', 'success')
            setLoading(true)
            navigate("/")
        } catch {
            setLoading(false)
        }
    }
    
    return (
        <>
        <div class="login-container">
        <h2 style={{marginBottom: "20px",color: "#ff6600"}}>Admin Dashboard</h2>
        <form id="loginForm" action="#" method="POST" onsubmit="return validateForm()">
            <div class="form-group">
                <label for="email">Email:</label>
                <input onChange={handleInputChanges} type="email" id="email" name="email" placeholder="Nhập vào email" required />
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input onChange={handleInputChanges} type="password" id="password" name="password" placeholder="Nhập vào mật khẩu" required />
            </div>
            <button type="submit" class="login-button" onClick={handleSubmit}>Đăng nhập</button>
        </form>
        </div>
        { notify.visible && (
            <div id="alert" class={`alert ${notify.type}`}>
                <span class="closebtn" onClick={closeNotification}>&times;</span>
                <strong>{notify.message}</strong>
            </div>
        )}
        {loading && (
            <div className="overlay">
            <div className="loader">Đang xử lý...</div>
          </div>
        )}
        </>
    );
}

export default Auth;