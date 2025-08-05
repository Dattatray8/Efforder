import express, { Router } from "express";
import { placeOrder } from "../controllers/order.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const orderRouter = express(Router());

orderRouter.post("/placeOrder", checkAuth, placeOrder);

export default orderRouter;
