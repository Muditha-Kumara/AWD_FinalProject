const AppError = require("../utils/AppError");

const validateRegisterUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return next(new AppError("Name is required", "ValidationError", 400));
  }
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    return next(
      new AppError(
        "Name can only contain letters and numbers",
        "ValidationError",
        400,
      ),
    );
  }
  if (!email) {
    return next(new AppError("Email is required", "ValidationError", 400));
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new AppError("Email is not valid", "ValidationError", 400));
  }
  if (!password) {
    return next(new AppError("Password is required", "ValidationError", 400));
  }
  if (password.length < 6) {
    return next(
      new AppError(
        "Password must be at least 6 characters long",
        "ValidationError",
        400,
      ),
    );
  }

  next();
};

module.exports = { validateRegisterUser };
