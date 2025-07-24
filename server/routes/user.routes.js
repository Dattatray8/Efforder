import express, { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { getUserData } from "../controllers/user.controller.js";

const userRoutes = express(Router());

userRoutes.get("/getUser", checkAuth, getUserData);

export default userRoutes;
