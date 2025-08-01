import express, { Router } from "express";
import {
  addProduct,
  getProducts,
  removeProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";

const productRoutes = express(Router());

productRoutes.post("/addProduct", upload.single("image"), addProduct);
productRoutes.get("/getProducts", getProducts);
productRoutes.post("/removeProduct/:id", removeProduct);

export default productRoutes;
