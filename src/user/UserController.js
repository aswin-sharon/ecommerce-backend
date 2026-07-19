import BaseController from "../core/BaseController.js";
import UserService from "./UserService.js";

class UserController extends BaseController {
    constructor() {
        super();

        // Bind instance methods for Express route handlers
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUsersByRole = this.getUsersByRole.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    // Bind controller methods so `this` refers to the controller instance
    // when Express invokes them as route handlers. 

    // prototype methods for user operations
    async register(req, res) {
        try {
            const result = await UserService.registerUser(req.body);
            return this.success(res, result, 201);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async login(req, res) {
        try {
            const result = await UserService.loginUser(req.body);
            return this.success(res, result);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(Number(req.params.id));

            if (!user) {
                return this.error(res, "User not found", 404);
            }

            return this.success(res, user);
        } catch (err) {
            const statusCode = err.message === "User not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return this.success(res, users);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async getUsersByRole(req, res) {
        try {
            const { role } = req.query;

            if (!role) {
                return this.error(res, "Role query parameter is required");
            }

            const users = await UserService.getUsersByRole(role);
            return this.success(res, users);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(
                Number(req.params.id),
                req.body
            );

            return this.success(res, user);
        } catch (err) {
            const statusCode = err.message === "User not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await UserService.deleteUser(Number(req.params.id));
            return this.success(res, result);
        } catch (err) {
            const statusCode = err.message === "User not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }
}

export default new UserController();