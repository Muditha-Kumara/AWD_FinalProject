const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return next(new AppError("No token provided", "AuthError", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new AppError("Invalid or expired token", "AuthError", 403));
    }
    req.user = user; // Attach user info to request
    next();
  });
};
