const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../models/db");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.debug("Login attempt for email:", email);

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.debug("Database query result:", result.rows);

    if (result.rows.length === 0) {
      console.warn("User not found for email:", email);
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.debug("Password match status:", isMatch);

    if (!isMatch) {
      console.warn("Invalid credentials for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );
    console.debug("Generated JWT token for user ID:", user.id);

    res.json({ token });
  } catch (err) {
    console.error("Error during login process:", err.message);
    res.status(500).json({ error: err.message });
  }
};
