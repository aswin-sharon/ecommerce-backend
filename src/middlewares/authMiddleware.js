import { verifyToken } from "../utils/jwt.js";
import User from "../user/UserModel.js";

//TODO: analyse and optimise this code
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    req.user = await User.findById(decoded.id).select("-password");
    next();
};
