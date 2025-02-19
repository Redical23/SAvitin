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
    console.log(`🌍 Render's Public IP: ${publicIP}`);

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);

    if (error.message.includes("Could not connect to any servers")) {
      console.error("🚨 Possible Issue: Your IP might not be whitelisted in MongoDB Atlas.");
      console.error("🔗 Go to MongoDB Atlas → Network Access → Add IP Address.");
    } else if (error.message.includes("TLS")) {
      console.error("⚠️ SSL/TLS Error: Make sure your connection string includes `&tls=true` or `?ssl=true`.");
    }
  }
};

export default dbconnect;
