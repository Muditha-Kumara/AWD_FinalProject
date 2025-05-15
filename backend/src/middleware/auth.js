const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

module.exports = function (req, res, next) {
  if (!req.cookies || !req.cookies.token) {
    return next(new AppError("No token provided", "AuthError", 401));
  }

  const token = req.cookies.token; // Retrieve token from HTTP-only cookie

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new AppError("Invalid or expired token", "AuthError", 403));
    }
    req.user = user; // Attach user info to request
    next();
  });
};
