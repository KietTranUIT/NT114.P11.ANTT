import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../helpers";
import { getLocalStorageWithTime } from "../helpers";

// Redirect request if user haven't authenticated
const ProtectedRoute = () => {
    // const access_token = useSelector((state) => ({ ...state }))
    // const isEmptyObject = (obj) => Object.entries(access_token).length === 0;
    const access_token = getLocalStorageWithTime('access_token');
    if (!access_token) {
        return <Navigate to="/auth" />
    }
    // const httpRes = validateToken({ token: access_token })
    // if (httpRes.status === 200) {
    //     return <Outlet />
    // }
    // return <Navigate to="/auth" />
    return <Outlet />
}

export default ProtectedRoute;