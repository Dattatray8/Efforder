import mongoose from "mongoose";

export default async function dbconnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successfull");
  } catch (err) {
    console.log("Database connection failed due to : ", err);
  }
}