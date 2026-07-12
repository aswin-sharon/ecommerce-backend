import { verifyToken } from "../utils/jwt.js";
import UserService from "../user/UserService.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }

        const user = await UserService.getUserById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // Don't expose password to the request object
        const { password, ...userWithoutPassword } = user;

        req.user = userWithoutPassword;

        next();
    } catch (err) {
        console.error(err);

        return res.status(401).json({
            message: "Authentication failed",
        });
    }
};