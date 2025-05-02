const validateLoginUser = (req, res, next) => {
    const { email, password } = req.body;
    console.debug('validateLoginUser - Request Body:', req.body);
    if (!email || !password) {
        console.debug('validateLoginUser - Missing email or password');
        return res.status(400).json({ error: 'Email and password are required' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        console.debug('validateLoginUser - Invalid email format:', email);
        return res.status(400).json({ error: 'Email is not valid' });
    }
    console.debug('validateLoginUser - Validation passed');
    next();
};

module.exports = { validateLoginUser };