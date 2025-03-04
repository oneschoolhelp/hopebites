const express = require("express");
const pool = require("../config/db"); // Import database connection
const router = express.Router();

// Register donor
router.post("/", async (req, res) => {
  try {
    const { full_name, email, mobile, country, zip_code } = req.body;

    // Check if donor already exists
    const existingDonor = await pool.query(
      "SELECT donor_id FROM donors WHERE email = $1",
      [email]
    );
    if (existingDonor.rows.length > 0) {
      return res.json({ donor_id: existingDonor.rows[0].donor_id });
    }

    // Insert new donor
    const result = await pool.query(
      "INSERT INTO donors (full_name, email, mobile, country, zip_code) VALUES ($1, $2, $3, $4, $5) RETURNING donor_id",
      [full_name, email, mobile, country, zip_code]
    );

    res.json({ donor_id: result.rows[0].donor_id });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
