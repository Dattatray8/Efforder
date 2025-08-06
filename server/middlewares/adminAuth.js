import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    let token = req.cookies.admin_token;
    if (!token) {
      return res.status(400).json({ message: "Admin not authenticated" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verifyToken.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ message: "Access denied: Not an admin" });
    }
    req.email = verifyToken.email;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Sevrer side error" });
  }
};