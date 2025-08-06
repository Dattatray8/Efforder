import express, { Router } from "express";
import {
  adminLogin,
  adminLogout,
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
authRouter.post("/adminlogout", adminLogout);

export default authRouter;
