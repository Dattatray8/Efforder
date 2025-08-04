import Users from "../models/user.model.js";
import Products from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    let { productId, productCount } = req.body;
    const userData = await Users.findById(req.userId);
    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let cart = userData.cartData || {};
    if (cart[productId]) {
      cart[productId] += productCount;
    } else {
      cart[productId] = productCount;
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
    const productIds = Object.keys(cart);
    if (productIds.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "Cart is empty", cart: {} });
    }
    const products = await Products.find({ _id: { $in: productIds } }).lean();
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found in cart" });
    }
    const cartItems = products.map((product) => ({
      product,
      quantity: cart[product._id.toString()] || 0,
    }));
    return res
      .status(200)
      .json({ success: true, message: "Cart Data: ", cart: cartItems });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get current user cart" });
  }
};
