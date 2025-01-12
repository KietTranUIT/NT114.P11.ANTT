import { useState } from "react";
import { login, getToken, getLocalStorageWithTime } from "./../helpers";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage, validateToken } from "./../helpers";

function Auth() {
  const userInfos = {
    email: "",
    password: "",
  };

  const notifications = {
    message: "",
    type: "",
    visible: false,
  };
  const [user, setUser] = useState(userInfos);
  const [notify, setNotify] = useState(notifications);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update user state when user enter text in input
  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Show notification
  const showNotification = (message, type) => {
    // Set up visible is true
    setNotify({ message: message, type: type, visible: true });

    // Automaticly hidden notification
    setTimeout(() => {
      setNotify({ ...notify, visible: false });
    }, 4000);
  };

  // Close notification
  const closeNotification = () => {
    setNotify({ ...notify, visible: false });
  };

  // Send login request
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const httpRes = await login(user);
      if (httpRes instanceof Error) {
        showNotification("Email hoặc mật khẩu không chính xác!", "error");
        alert('Tài khoản hoặc mật khẩu không chính xác')
        throw new Error("");
      }

      // Save token in authorization
      // const authorization = response.headers['authorization']
      // const token = getToken(authorization)
      // Cookies.set("access_token", token.accessToken, {
      //     expires: 1 / 24,
      //     sameSite: 'Strict'
      // })
      // Cookies.set("refresh_token", token.refreshToken, {
      //     path: "/users/refresh",
      //     expires: 7,
      //     samesite: 'Strict'
      // })
      const authorization = httpRes.data.token;
      let [tokenStr1, tokenStr2] = authorization.split(";");
      let accessToken = tokenStr1.split("=")[1];
      let refreshToken = tokenStr2.split("=")[1];

      const response = await validateToken({ token: accessToken });
      if (response.status != 200) {
        alert("permission denied");
        return;
      }

      // localStorage.setItem('access_token', accessToken)
      saveToLocalStorage("access_token", accessToken, 60 * 60 * 1000);
      // localStorage.setItem('user', JSON.stringify(httpRes.data.data))
      saveToLocalStorage("user", httpRes.data.data, 60 * 60 * 1000);
      saveToLocalStorage("cart", httpRes.data.cart, 60 * 60 * 1000);

      const date = new Date();
      date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
      document.cookie = `refresh_token=${refreshToken}; expires=${date.toUTCString()}; path=/; SameSite=Strict`;
      document.cookie = `bearer=${accessToken}; expires=${date.toUTCString()}; path=/; SameSite=Strict`;

      //   dispatch({
      //     type: "LOGIN",
      //     payload: JSON.parse(getLocalStorageWithTime("access_token")),
      //   });

      // showNotification("Đăng nhập thành công!", "success");
      alert('Đăng nhập thành công')
      setLoading(true);
      navigate("/");
    } catch {
      setLoading(false);
    }
  };

  return (
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Admin login</h3>
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={handleInputChanges}
                class="form-control"
                name="email"
                id="email"
                placeholder="Nhập email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                onChange={handleInputChanges}
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100" onClick={handleSubmit}>
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
      {/* <div class="login-container">
        <h2 style={{ marginBottom: "20px", color: "#ff6600" }}>
          Admin Dashboard
        </h2>
        <form
          id="loginForm"
          action="#"
          method="POST"
          onsubmit="return validateForm()"
        >
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              onChange={handleInputChanges}
              type="email"
              id="email"
              name="email"
              placeholder="Nhập vào email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu:</label>
            <input
              onChange={handleInputChanges}
              type="password"
              id="password"
              name="password"
              placeholder="Nhập vào mật khẩu"
              required
            />
          </div>
          <button type="submit" class="login-button" onClick={handleSubmit}>
            Đăng nhập
          </button>
        </form>
      </div>
      {notify.visible && (
        <div id="alert" class={`alert ${notify.type}`}>
          <span class="closebtn" onClick={closeNotification}>
            &times;
          </span>
          <strong>{notify.message}</strong>
        </div>
      )}
      {loading && (
        <div className="overlay">
          <div className="loader">Đang xử lý...</div>
        </div>
      )} */}
    </div>
  );
}

export default Auth;
