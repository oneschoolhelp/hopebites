const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "hopebites",
  password: process.env.DB_PASSWORD || "manage",
  port: process.env.DB_PORT || 7432,
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err.stack));

module.exports = pool;
