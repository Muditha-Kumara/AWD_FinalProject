// filepath: /home/muditha/AdvanceWeb/AWD_FinalProject/backend/src/routes/loanRoutes.js
const express = require('express');
const router = express.Router();

// Example route for loans
router.get('/', (req, res) => {
    res.send('Loan routes are working!');
});

module.exports = router;