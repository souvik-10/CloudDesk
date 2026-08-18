const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // 2. Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
        // 3. Cryptographically verify the token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the user info to the request so the controller can use it later
        req.user = decoded;

        // 5. Let the request pass through to the controller!
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Forbidden: Invalid or expired token' });
    }
};

module.exports = {
    verifyToken
};
