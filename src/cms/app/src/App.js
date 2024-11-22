import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/product/AddProduct";
import ListProducts from "./pages/product/ListProduct";
import ProtectedRoute from "./routes/protect";
import NotFound from "./pages/404";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/addproduct" exact element={<AddProduct/>}/>
        <Route path="/listproducts" exact element={<ListProducts/>}/>
        <Route path="/auth" exact element={<Auth/>} />
        <Route element={ <ProtectedRoute />}>
          <Route path="/" element={ <Dashboard /> } />
        </Route>
        <Route path="*" element={ <NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
