const { neon } = require('@neondatabase/serverless');
require("dotenv").config();

const connectDB = neon(process.env.NEON_DATABASE_URL);
module.exports = connectDB;
