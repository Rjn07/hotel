const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    try {
        // Check if request header has authorization or not
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token not found or invalid format" });
        }

        // Extract token after "Bearer"
        const token = authorization.split(' ')[1];

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        console.error("JWT Authentication Error:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign({ userId: userData }, process.env.JWT_SECRET, { expiresIn: '30m' });
};

module.exports = { jwtAuthMiddleware, generateToken };
