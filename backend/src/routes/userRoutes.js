const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { validateLoginUser } = require("../middleware/validateLoginUser");
const { validateRegisterUser } = require("../middleware/validateRegisterUser");
const router = express.Router();

// Add validation middleware before controllers
router.post("/register", validateRegisterUser, registerUser);
router.post("/login", validateLoginUser, loginUser);

module.exports = router;
