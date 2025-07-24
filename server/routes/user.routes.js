import express, { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { getUserData } from "../controllers/user.controller.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAdmin } from "../controllers/auth.controller.js";

const userRoutes = express(Router());

userRoutes.get("/getUser", checkAuth, getUserData);
userRoutes.get("/getadmin", adminAuth, getAdmin);

export default userRoutes;
