const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is missing! Check your .env.local file.");
}

const connectDB = () => neon(process.env.NEON_DATABASE_URL);

module.exports = connectDB;