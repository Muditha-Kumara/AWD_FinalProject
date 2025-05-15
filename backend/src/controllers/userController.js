const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../models/db");
const AppError = require("../utils/AppError");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(new AppError(err.message, "DatabaseError", 500));
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.debug("Login attempt for email:", email);

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.debug("Database query result:", result.rows);

    if (result.rows.length === 0) {
      console.warn("User not found for email:", email);
      return next(new AppError("User not found", "NotFoundError", 404));
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.debug("Password match status:", isMatch);

    if (!isMatch) {
      console.warn("Invalid credentials for email:", email);
      return next(new AppError("Invalid credentials", "AuthError", 401));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
    );
    console.debug("Generated JWT token for user ID:", user.id);

    res.json({ token });
  } catch (err) {
    console.error("Error during login process:", err.message);
    next(new AppError(err.message, "ServerError", 500));
  }
};
