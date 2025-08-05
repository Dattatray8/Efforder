import Orders from "../models/order.model.js";
import Users from "../models/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Orders(orderData);
    await newOrder.save();
    await Users.findByIdAndUpdate(userId, { cartData: {} });
    return res
      .status(201)
      .json({
        success: true,
        message: "Order placed successfully",
        order: newOrder,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order",
        error: error.message,
      });
  }
};
