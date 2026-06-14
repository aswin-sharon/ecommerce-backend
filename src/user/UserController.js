import UserService from "./UserService.js";

class UserController {
    async register(req, res) {
        try {
            const { user, token } = await UserService.registerUser(req.body);
            res.status(201).json({ success: true, data: { user, token } });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async login(req, res) {
        try {
            const { user, token } = await UserService.loginUser(req.body);
            res.status(200).json({ success: true, data: { user, token } });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(parseInt(id));
            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getUsersByRole(req, res) {
        try {
            const { role } = req.query;
            if (!role) {
                throw new Error("Role query parameter is required");
            }
            const users = await UserService.getUsersByRole(role);
            res.status(200).json({ success: true, data: users });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.updateUser(parseInt(id), req.body);
            res.status(200).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(parseInt(id));
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}

export default new UserController();
