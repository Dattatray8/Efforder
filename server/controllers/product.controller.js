import uploadCloudinary from "../config/cloudinary.js";
import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    let {
      name,
      price,
      oldPrice,
      discount,
      category,
      productId,
      reviewCount,
      stock,
      description,
    } = req.body;
    let features = req.body.features;
    let featuresArray = features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    let image = await uploadCloudinary(req.file.path);
    const product = await Product.create({
      name,
      price,
      oldPrice,
      discount,
      category,
      productId,
      reviewCount,
      stock,
      description,
      features: featuresArray,
      image,
    });
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "List of products: ",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get Products",
      error: error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: error.message,
    });
  }
};
