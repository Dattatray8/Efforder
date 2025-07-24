import Users from "../models/user.model.js";

export const getUserData = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "user id not found" });
    }
    let user = await Users.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server side error" });
  }
};
