const validateLoginUser = (req, res, next) => {
  const { email, password } = req.body;
  console.debug("validateLoginUser - Request Body:", req.body);

  if (!email || !password) {
    console.debug("validateLoginUser - Missing email or password");
    return next(new ValidationError("Email and password are required"));
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    console.debug("validateLoginUser - Invalid email format:", email);
    return next(new ValidationError("Email is not valid"));
  }

  console.debug("validateLoginUser - Validation passed");
  next();
};

module.exports = { validateLoginUser };