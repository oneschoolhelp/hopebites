const { Pool } = require("pg");

const pool = new Pool({
  user: "hopeadmin", // usually "postgres"
  host: "localhost",
  database: "hopebites", // name of your database
  password: "manage", // your postgres password
  port: 7432, // default port for PostgreSQL
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("PostgreSQL connected successfully!");
  }
});

module.exports = pool;
