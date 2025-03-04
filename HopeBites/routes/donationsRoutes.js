const express = require("express");
const pool = require("../config/db"); // Import database connection
const router = express.Router();

// Register donation
router.post("/", async (req, res) => {
  try {
    const { donor_id, country_type, donation_type, donation_amount } = req.body;

    const result = await pool.query(
      "INSERT INTO donations (donor_id, country_type, donation_type, donation_amount) VALUES ($1, $2, $3, $4) RETURNING donation_id",
      [donor_id, country_type, donation_type, donation_amount]
    );

    res.json({ donation_id: result.rows[0].donation_id });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
