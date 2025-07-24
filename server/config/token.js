import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const generateAdminToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};
