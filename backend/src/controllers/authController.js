const jwt = require('jsonwebtoken');

const login = (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if credentials match our .env file
        if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Generate the digital passport (JWT) valid for 24 hours
        const token = jwt.sign(
            { role: 'admin', username: username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ success: true, token: token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

module.exports = {
    login
};
