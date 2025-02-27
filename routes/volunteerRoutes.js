const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "hopeadmin",
  host: "localhost",
  database: "hopebites",
  password: "manage",
  port: 7432, // ✅ Use the correct port
});

router.post("/register", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Check incoming data

    const { first_name, last_name, email, address, city, country, message } =
      req.body;

    const query = `
            INSERT INTO volunteers (first_name, last_name, email, address, city, country, message)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

    await pool.query(query, [
      first_name,
      last_name,
      email,
      address,
      city,
      country,
      message,
    ]);

    res.status(201).json({ message: "Volunteer registered successfully!" });
  } catch (error) {
    console.error("Error inserting volunteer:", error); // 🔥 This will reveal the exact issue
    res
      .status(500)
      .json({ message: "Server error while registering volunteer" });
  }
});

router.get("/volunteers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM volunteers ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Server error while fetching volunteers" });
  }
});

module.exports = router;
