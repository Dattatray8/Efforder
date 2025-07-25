import express, { Router } from "express";
import {
  adminLogin,
  googleLogin,
  Home,
  login,
  logout,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express(Router());

authRouter.get("/", Home);
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/googleLogin", googleLogin);
authRouter.post("/adminlogin", adminLogin);

export default authRouter;
