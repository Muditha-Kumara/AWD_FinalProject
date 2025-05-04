const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const loanRoutes = require('./loanRoutes');
const calculationController = require('../controllers/calculationController');
const auth = require('../middleware/auth');

router.use('/users', userRoutes);
router.use('/loans', loanRoutes);

router.post('/calculations/save', auth, calculationController.saveCalculation);

module.exports = router;