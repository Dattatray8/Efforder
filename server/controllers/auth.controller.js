import { generateToken, generateAdminToken } from "../config/token.js";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export const Home = (req, res) => {
  res.send("Hello from server");
};

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Fill all details" });
    }
    let isUser = await Users.findOne({ userName });
    if (isUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(402).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.status(401).json({ message: "Enter strong password" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      userName,
      email,
      password: hashPassword,
    });
    let token;
    try {
      token = generateToken(user._id);
    } catch (err) {
      return res.status(400).json({ message: "user id not found" });
    }
    res.cookie("token", token, {
      httponly: true,
      secure: false,
      samesite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).send("User created successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server side error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all details" });
    }
    if (!validator.isEmail(email)) {
      return res.status(404).json({ message: "Enter valid email" });
    }
    let isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ message: "user not exists" });
    }
    if (password.length < 8) {
      return res.status(401).json({ message: "Enter strong password" });
    }
    let correctUser = await bcrypt.compare(password, isUser.password);
    if (!correctUser) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    let token;
    try {
      token = generateToken(isUser._id);
    } catch (err) {
      return res.status(400).json({ message: "user id not found" });
    }
    res.cookie("token", token, {
      httponly: true,
      secure: false,
      samesite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send("login successfull");
  } catch (error) {
    return res.status(500).json({ message: "Server side error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successfull" });
  } catch (err) {
    return res.status(500).json({ message: "Server side error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let User = await Users.findOne({ email });
    if (!User) {
      User = await Users.create({ userName: name, email });
    }
    let token;
    try {
      token = generateToken(User._id);
    } catch (err) {
      return res.status(400).json({ message: "user id not found" });
    }
    res.cookie("token", token, {
      httponly: true,
      secure: false,
      samesite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send("Google login successfull");
  } catch (error) {
    return res.status(500).json({ message: "Google login error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token;
      try {
        token = generateAdminToken(email);
      } catch (err) {
        return res.status(400).json({ message: "admin email not found" });
      }
      res.cookie("token", token, {
        httponly: true,
        secure: false,
        samesite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send("Admin login successfull");
    }
  } catch (err) {
    return res.status(500).json({ message: "Admin login error" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    let adminEmail = req.email;
    if (!adminEmail) {
      return res.status(400).json({ message: "Admin email not found" });
    }
    return res.status(201).json({ email: adminEmail, role: "Admin" });
  } catch (error) {
    return res.status(500).json({ message: "Server side error" });
  }
};
