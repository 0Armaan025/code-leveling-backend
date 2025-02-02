const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    // Get the token from the Authorization header and split it into two parts: "Bearer <token>"
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {

        const verified = jwt.verify(token, JWT_SECRET);
        // Add the verified user to the request object
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid" });
    }
}
