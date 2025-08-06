import express, { Router } from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateStatus,
} from "../controllers/order.controller.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const orderRouter = express(Router());

orderRouter.post("/placeOrder", checkAuth, placeOrder);
orderRouter.get("/getUserOrders", checkAuth, getUserOrders);
orderRouter.get("/allOrders", adminAuth, getAllOrders);
orderRouter.post("/updateStatus", adminAuth, updateStatus);

export default orderRouter;
