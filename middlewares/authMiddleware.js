const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, "your_jwt_secret");
        req.user = await User.findById(decoded.id).select("-password"); // Find user and exclude the password

        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }

        // If everything is valid, proceed
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authenticate;
