const mongoose = require("mongoose");
require("dotenv").config(); // Add this line to load .env variables

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log(`Connecting to MongoDB using URI: ${mongoURI}`);
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
