import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/product/AddProduct";
import ListProducts from "./pages/product/ListProduct";
import ProtectedRoute from "./routes/protect";
import NotFound from "./pages/404";
import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "./pages/category/Categories";
import Brands from "./pages/brand/Brands";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/categories" exact element={<Categories/>}/>
        <Route path="/addproduct" exact element={<AddProduct/>}/>
        <Route path="/products" exact element={<ListProducts/>}/>
        <Route path="/brands" exact element={<Brands/>}/>
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
