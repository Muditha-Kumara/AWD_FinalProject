const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const loanRoutes = require('./loanRoutes');
const calculationController = require('../controllers/calculationController');

router.use('/users', userRoutes);
router.use('/loans', loanRoutes);

// Add route for saving calculations
router.post('/calculations/save', calculationController.saveCalculation);

module.exports = router;