import mongoose from "mongoose";

let isConnected = false; // Track if the DB is already connected

const dbconnect = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    // Log the server's public IP (for MongoDB Atlas whitelisting)
    const response = await fetch("https://ifconfig.me");
    const publicIP = await response.text();
  

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);

   
  }
};

export default dbconnect;
