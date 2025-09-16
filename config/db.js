const mongoose = require("mongoose");

const DEFAULT_LOCAL_URI = process.env.NODE_ENV === "test"
  ? "mongodb://127.0.0.1:27017/blogDB"
  : "mongodb://127.0.0.1:27017/blog";

async function attemptConnection(uri) {
  // Mongoose v8+ uses modern defaults; keep options minimal
  await mongoose.connect(uri);
}

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || DEFAULT_LOCAL_URI;
  let attempt = 0;

  const tryConnect = async () => {
    attempt += 1;
    try {
      await attemptConnection(mongoUri);
      console.log("MongoDB Connected");
    } catch (err) {
      const waitMs = Math.min(30000, 2000 * attempt);
      console.error(`[DB] Connection attempt ${attempt} failed: ${err.message}`);
      console.error(`[DB] Retrying in ${waitMs}ms. Using URI host: ${(() => {
        try { return new URL(mongoUri.replace(/^mongodb\+srv:\/\//, 'https://').replace(/^mongodb:\/\//, 'http://')).host; } catch { return 'unknown'; }
      })()}`);
      setTimeout(tryConnect, waitMs);
    }
  };

  tryConnect();
};

module.exports = connectDB;
