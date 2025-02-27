const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

const pool = new Pool({
  user: "hopeadmin",
  host: "localhost",
  database: "hopebites",
  password: "manage",
  port: 7432,
});

// 🟢 Register Donation
router.post("/donate", async (req, res) => {
  try {
    const {
      full_name,
      email,
      contact_no,
      donation_country, // ✅ Rename this
      zip_code,
      donation_type,
      amount,
    } = req.body;

    const country = donation_country; // ✅ Ensure country gets a value

    // 🟢 Insert into donors (if email does not exist)
    let donorResult = await pool.query(
      "SELECT id FROM donors WHERE email = $1",
      [email]
    );

    let donorId;
    if (donorResult.rows.length > 0) {
      donorId = donorResult.rows[0].id;
    } else {
      const insertDonor = await pool.query(
        `INSERT INTO donors (full_name, email, contact_no, country, zip_code) 
             VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [full_name, email, contact_no, country, zip_code] // ✅ country now has a value
      );
      donorId = insertDonor.rows[0].id;
    }

    // 🟢 Insert donation record
    await pool.query(
      "INSERT INTO donations (donor_id, donation_type, donation_country, amount) VALUES ($1, $2, $3, $4)",
      [donorId, donation_type, donation_country, amount]
    );

    res.status(201).json({ message: "Donation successful!" });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ message: "Server error while processing donation" });
  }
});

module.exports = router;
