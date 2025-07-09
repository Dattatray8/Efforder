import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/category/:cName" element={<Products />} />
        <Route
          path="/products/category/:cName/:pId"
          element={<ProductDetails />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;