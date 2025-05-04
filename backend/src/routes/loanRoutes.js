const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const calculationController = require('../controllers/calculationController');

// Updated route to return loan type and interest value
router.get('/', (req, res) => {
   const loanDetails = [
    { id: 1, name: 'Home Loan', interestRate: 3.5 },
    { id: 2, name: 'Car Loan', interestRate: 4.2 },
    { id: 3, name: 'Personal Loan', interestRate: 5.0 },
    { id: 4, name: 'Student Loan', interestRate: 2.8 },
  ];
    res.json(loanDetails);
});

// Get all calculations for the authenticated user
router.get('/calculations/all', auth, calculationController.getAllCalculations);

module.exports = router;