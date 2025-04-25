const validateLoginUser = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Email is not valid' });
    }
    next();
};

module.exports = { validateLoginUser };