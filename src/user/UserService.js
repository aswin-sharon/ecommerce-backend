import User from "./UserModel.js";
import { generateToken } from "../utils/jwt.js";

class UserService {
    // Register new user
    async registerUser(userData) {
        const { email } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const user = await User.create(userData); // password hashed by pre-save hook
        const token = generateToken(user._id);

        return { user, token };
    }

    // Login user
    async loginUser({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = generateToken(user._id);
        return { user, token };
    }
}

export default new UserService();
