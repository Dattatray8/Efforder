import express, { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import {
  addToCart,
  getCurrentUserCart,
  updateCart,
} from "../controllers/cart.controller.js";

const cartRouter = express(Router());

cartRouter.post("/addToCart", checkAuth, addToCart);
cartRouter.post("/updateCart", checkAuth, updateCart);
cartRouter.post("/getCart", checkAuth, getCurrentUserCart);

export default cartRouter;
