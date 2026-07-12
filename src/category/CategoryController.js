import BaseController from "../core/BaseController.js";
import CategoryService from "./CategoryService.js";

class CategoryController extends BaseController {
    async create(req, res) {
        try {
            const result = await CategoryService.create(req.body);
            return this.success(res, result, 201);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async list(req, res) {
        try {
            const result = await CategoryService.list();
            return this.success(res, result);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async get(req, res) {
        try {
            const result = await CategoryService.get(req.params.id);

            if (!result) {
                return this.error(res, "Category not found", 404);
            }

            return this.success(res, result);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async update(req, res) {
        try {
            const result = await CategoryService.update(req.params.id, req.body);
            return this.success(res, result);
        } catch (err) {
            const statusCode = err.message === "Category not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }

    async remove(req, res) {
        try {
            const result = await CategoryService.remove(req.params.id);
            return this.success(res, result);
        } catch (err) {
            const statusCode = err.message === "Category not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }
}

export default new CategoryController();