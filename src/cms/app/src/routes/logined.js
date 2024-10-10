import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Redirect request if user haven't authenticated
const ProtectedRoute = () => {
    const { user } = useSelector((state) => ({...state}))

    return user ? <Navigate to="/" /> : <Outlet />
}

export default ProtectedRoute;