const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const connectionString = process.env.DB_CONNECTION_STRING;
  try {
    await mongoose.connect(connectionString);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;
