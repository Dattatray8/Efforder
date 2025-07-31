import express, { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";

const productRoutes = express(Router());

productRoutes.post("/addProduct", upload.single("image"), addProduct);

export default productRoutes;
