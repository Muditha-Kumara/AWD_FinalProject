const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const loanRoutes = require("./loanRoutes");
const calculationController = require("../controllers/calculationController");
const auth = require("../middleware/auth");

router.use("/users", userRoutes);
router.use("/loans", loanRoutes);

router.post("/calculations/save", auth, calculationController.saveCalculation);

// Endpoint to check authentication status
router.get("/auth/status", auth, (req, res) => {
  try {
    res.status(200).json({
      isLoggedIn: true,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to check authentication status." });
  }
});

module.exports = router;
