import express, { Router } from "express";
import { getUserOrders, placeOrder } from "../controllers/order.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const orderRouter = express(Router());

orderRouter.post("/placeOrder", checkAuth, placeOrder);
orderRouter.get("/getUserOrders", checkAuth, getUserOrders);

export default orderRouter;
