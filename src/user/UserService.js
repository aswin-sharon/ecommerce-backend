import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";

const UserDB = prisma.user;

class UserService {
    // Register new user
    async registerUser(userData) {
        const { email, first_name, last_name, password, role } = userData;

        // Check if user already exists - simple query with Prisma
        const existingUser = await UserDB.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user - simple query with Prisma
        const user = await UserDB.create({
            data: {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: role || "customer",
            },
        });

        // Generate token
        const token = generateToken(user.id);

        // Return user (without password) and token
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    // Login user
    async loginUser({ email, password }) {
        // Find user by email - simple query with Prisma
        const user = await UserDB.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate token
        const token = generateToken(user.id);

        // Return user (without password) and token
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    // Get user by ID - simple query
    async getUserById(userId) {
        const user = await UserDB.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Get all users - simple query
    async getAllUsers() {
        const users = await UserDB.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
            },
        });
        return users;
    }

    // Get users by role - simple query
    async getUsersByRole(role) {
        const users = await UserDB.findMany({
            where: {
                role: role.toUpperCase(),
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                created_at: true,
            },
        });
        return users;
    }

    // Update user - simple query
    async updateUser(userId, updateD_ata) {
        const { password, ...otherData } = updateD_ata;

        const dataToUpdate = { ...otherData };

        if (password) {
            dataToUpdate.password = await hashPassword(password);
        }

        const user = await UserDB.update({
            where: { id: userId },
            data: dataToUpdate,
        });

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Delete user - simple query
    async deleteUser(userId) {
        await UserDB.delete({
            where: { id: userId },
        });
        return { message: "User deleted successfully" };
    }
}

export default new UserService();
