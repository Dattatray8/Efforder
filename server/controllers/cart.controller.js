import Users from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    let { productId } = req.body;
    const userData = await Users.findById(req.userId);
    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let cart = userData.cartData || {};
    if (cart[productId]) {
      cart[productId] += 1;
    } else {
      cart[productId] = 1;
    }
    await Users.findByIdAndUpdate(req.userId, { cartData: cart });
    return res
      .status(201)
      .json({ success: true, message: "Product added to cart", cart });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    let { productId, quantity } = req.body;
    const userData = await Users.findById(req.userId);
    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let cart = userData.cartData || {};
    cart[productId] = quantity;
    await Users.findByIdAndUpdate(req.userId, { cartData: cart });
    return res
      .status(200)
      .json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update cart" });
  }
};

export const getCurrentUserCart = async (req, res) => {
  try {
    let user = await Users.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let cart = user.cartData || {};
    return res
      .status(200)
      .json({ success: true, message: "Cart Data: ", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get current user cart" });
  }
};
