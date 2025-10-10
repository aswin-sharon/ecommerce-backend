import UserService from "./UserService.js";

class UserController {
    async register(req, res) {
        try {
            const user = await UserService.registerUser(req.body);
            res.status(201).json({ success: true, data: user });
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
}

export default new UserController();
