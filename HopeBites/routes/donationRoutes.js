const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// PostgreSQL Database Connection
const pool = new Pool({
  user: "hopeadmin",
  host: "localhost",
  database: "hopebites",
  password: "manage",
  port: 7432,
});

// 🟢 Process Donation
router.post("/donate", async (req, res) => {
  try {
    const {
      full_name,
      email,
      contact_no,
      country,
      zip_code,
      donation_type,
      donation_country,
      amount,
    } = req.body;

    // 🔹 Check if donor already exists
    let donorResult = await pool.query(
      "SELECT id FROM donors WHERE email = $1",
      [email]
    );

    let donorId;
    if (donorResult.rows.length > 0) {
      donorId = donorResult.rows[0].id;
    } else {
      // 🔹 Insert new donor
      const newDonor = await pool.query(
        `INSERT INTO donors (full_name, email, contact_no, country, zip_code) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [full_name, email, contact_no, country, zip_code]
      );
      donorId = newDonor.rows[0].id;
    }

    // 🔹 Insert donation record
    await pool.query(
      `INSERT INTO donations (donor_id, donation_type, donation_country, amount) VALUES ($1, $2, $3, $4)`,
      [donorId, donation_type, donation_country, amount]
    );

    res.status(201).json({ message: "Donation successful!" });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ message: "Server error while processing donation" });
  }
});

// 🟢 Fetch all donations
router.get("/donations", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT d.id, d.full_name, d.email, d.contact_no, d.country, d.zip_code, 
                   dn.donation_type, dn.donation_country, dn.amount, dn.created_at
            FROM donors d
            JOIN donations dn ON d.id = dn.donor_id
            ORDER BY dn.created_at DESC
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Server error while fetching donations" });
  }
});

module.exports = router;
