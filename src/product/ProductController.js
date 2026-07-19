import BaseController from "../core/BaseController.js";
import ProductService from "./ProductService.js";

class ProductController extends BaseController {
    constructor() {
        super();

        // Bind instance methods for Express route handlers
        this.create = this.create.bind(this);
        this.list = this.list.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    // prototype methods for product operations
    async create(req, res) {
        try {
            const result = await ProductService.create(req.body);
            return this.success(res, result, 201);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async list(req, res) {
        try {
            const result = await ProductService.list();
            return this.success(res, result);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async get(req, res) {
        try {
            const result = await ProductService.get(req.params.id);

            if (!result) {
                return this.error(res, "Product not found", 404);
            }

            return this.success(res, result);
        } catch (err) {
            return this.error(res, err);
        }
    }

    async update(req, res) {
        try {
            const result = await ProductService.update(req.params.id, req.body);
            return this.success(res, result);
        } catch (err) {
            const statusCode = err.message === "Product not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }

    async remove(req, res) {
        try {
            const result = await ProductService.remove(req.params.id);
            return this.success(res, result);
        } catch (err) {
            const statusCode = err.message === "Product not found" ? 404 : 400;
            return this.error(res, err, statusCode);
        }
    }
}

export default new ProductController();