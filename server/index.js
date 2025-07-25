import express from "express";
import dotenv from "dotenv";
import dbconnection from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT || 6000, () => {
  dbconnection();
  console.log(`Server is running on Port : ${process.env.PORT}`);
});
