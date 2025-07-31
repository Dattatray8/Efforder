import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (filePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (!filePath) {
      return null;
    }
    const upload = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return upload.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("Error uploading to Cloudinary:", error);
  }
};

export default uploadCloudinary;
