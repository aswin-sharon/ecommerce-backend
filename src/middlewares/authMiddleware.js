import { verifyToken } from "../utils/jwt.js";
import User from "../user/UserModel.js";

//TODO: Validate this function
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Optional: skip DB hit if you stored user roles in token
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};

