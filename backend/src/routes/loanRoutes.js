// filepath: /home/muditha/AdvanceWeb/AWD_FinalProject/backend/src/routes/loanRoutes.js
const express = require('express');
const router = express.Router();

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

module.exports = router;