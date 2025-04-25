const validateRegisterUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    return res.status(400).json({
      error: "Name can only contain letters and numbers",
    });
  }
  if (!email) {
    return res.status(400).json({ error: "Email are required" });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (password.length < 6) {
    return res.status(400).json({
      error: "Password must be at least 6 characters long",
    });
  }
  next();
};

module.exports = { validateRegisterUser };
