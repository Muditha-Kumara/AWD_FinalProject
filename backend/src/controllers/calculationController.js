const db = require('../models/db');

// Controller to save a calculation
exports.saveCalculation = async (req, res) => {
  const { title, description, loanTypeName, loanAmount, interestRate, term, termType, monthlyPayment } = req.body;

  if (!title || !loanTypeName || !loanAmount || !interestRate || !term || !termType || !monthlyPayment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const query = `INSERT INTO calculations (title, description, loanTypeName, loanAmount, interestRate, term, termType, monthlyPayment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [title, description, loanTypeName, loanAmount, interestRate, term, termType, monthlyPayment];

    await db.query(query, values);

    res.status(201).json({ message: 'Calculation saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save calculation' });
  }
};