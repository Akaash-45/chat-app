import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    // Configure mongoose options for better connection handling
    const options = {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      family: 4, // Use IPv4, skip trying IPv6
    };

    // Check if MONGO_DB_URI is defined
    if (!process.env.MONGO_DB_URI) {
      throw new Error("MONGO_DB_URI environment variable is not defined");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_DB_URI, options);
    console.log("✅ Connected to MongoDB successfully");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️  MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);

    // Provide helpful error messages
    if (error.message.includes("ENOTFOUND")) {
      console.log("\n🔧 Troubleshooting tips:");
      console.log("1. Check if MongoDB is running locally");
      console.log("2. Verify your MONGO_DB_URI in backend/.env");
      console.log("3. For local MongoDB: mongodb://localhost:27017/chat-app");
      console.log(
        "4. For MongoDB Atlas: Check IP whitelist and connection string",
      );
    } else if (error.message.includes("authentication failed")) {
      console.log(
        "\n🔧 Authentication failed - check your username and password",
      );
    } else if (error.message.includes("IP whitelist")) {
      console.log(
        "\n🔧 IP Whitelist issue - add your IP to MongoDB Atlas whitelist",
      );
      console.log(
        "   Or use 0.0.0.0/0 to allow all IPs (not recommended for production)",
      );
    }

    console.log(
      "\n💡 Current MONGO_DB_URI:",
      process.env.MONGO_DB_URI ? "Set" : "Not set",
    );

    // Don't exit the process, let the server run without database
    // You might want to implement a retry mechanism here
  }
};

export default connectToMongoDB;
