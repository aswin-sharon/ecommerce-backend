import User from "./UserModel.js";
import jwt from "jsonwebtoken";

class UserService {
    // Register new user
    async registerUser(userData) {
        const { email } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const user = await User.create(userData); // password hashed by pre-save hook
        const token = this.generateToken(user._id);

        return { user, token };
    }

    // Login user
    async loginUser({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = this.generateToken(user._id);
        return { user, token };
    }

    // Generate JWT
    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    }
}

export default new UserService();
