import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Products />} />
        <Route
          path="/category/:cName/product/:pId"
          element={<ProductDetails />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;