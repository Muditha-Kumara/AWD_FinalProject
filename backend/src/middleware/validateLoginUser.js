const AppError = require("../utils/AppError");

const validateLoginUser = (req, res, next) => {
  const { email, password } = req.body;
  console.debug("validateLoginUser - Request Body:", req.body);

  if (!email || !password) {
    console.debug("validateLoginUser - Missing email or password");
    return next(
      new AppError("Email and password are required", "ValidationError", 400),
    );
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    console.debug("validateLoginUser - Invalid email format:", email);
    return next(new AppError("Email is not valid", "ValidationError", 400));
  }

  console.debug("validateLoginUser - Validation passed");
  next();
};

module.exports = { validateLoginUser };
