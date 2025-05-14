const db = require("../models/db");
const AppError = require("../utils/AppError");

exports.saveCalculation = async (req, res, next) => {
  const {
    title,
    description,
    loanTypeName,
    loanAmount,
    interestRate,
    term,
    termType,
    monthlyPayment,
  } = req.body;
  const email = req.user.email; // Get email from authenticated user

  if (
    !title ||
    !loanTypeName ||
    !loanAmount ||
    !interestRate ||
    !term ||
    !termType ||
    !monthlyPayment
  ) {
    return next(new AppError("Missing required fields", "ValidationError", 400));
  }

  try {
    const query = `INSERT INTO calculations (title, description, loanTypeName, loanAmount, interestRate, term, termType, monthlyPayment, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
      title,
      description,
      loanTypeName,
      loanAmount,
      interestRate,
      term,
      termType,
      monthlyPayment,
      email,
    ];

    await db.query(query, values);

    res.status(201).json({ message: "Calculation saved successfully" });
  } catch (error) {
    console.error(error);
    next(new AppError("Failed to save calculation", "DatabaseError", 500));
  }
};

exports.getAllCalculations = async (req, res) => {
  try {
    const email = req.user.email; // Get email from authenticated user
    const query = `SELECT * FROM calculations WHERE email = $1 ORDER BY createdAt DESC`;
    const { rows } = await db.query(query, [email]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load calculations." });
  }
};
