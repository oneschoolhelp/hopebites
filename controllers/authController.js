const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

// PostgreSQL Connection
const pool = new Pool({
  user: "hopeadmin", // Replace with your PostgreSQL user
  host: "localhost", // Host
  database: "hopebites", // Your DB name
  password: "manage", // Replace with your PostgreSQL password
  port: 7432, // Default PostgreSQL port
});

// ✅ Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 🔎 Check if user already exists with same email or name
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR name = $2",
      [email, name]
    );

    if (userCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email or name already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Insert user into database
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔎 Find user by email
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🛡️ Create JWT Token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET, // Use the secret from .env
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
