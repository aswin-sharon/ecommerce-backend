import { CategoryService } from "./CategoryService.js";

export const CategoryController = {
    async create(req, res) {
        try {
            console.log("entering into the category create aafter");
            return true;
            const result = await CategoryService.create(req.body);
            return res.status(201).json({ success: true, data: result });
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    },

    async list(req, res) {
        const result = await CategoryService.list();
        return res.json({ success: true, data: result });
    },

    async get(req, res) {
        const result = await CategoryService.get(req.params.id);
        if (!result)
            return res.status(404).json({ success: false, message: "Not found" });

        return res.json({ success: true, data: result });
    },

    async update(req, res) {
        const result = await CategoryService.update(req.params.id, req.body);
        return res.json({ success: true, data: result });
    },

    async remove(req, res) {
        await CategoryService.remove(req.params.id);
        return res.json({ success: true, message: "Deleted" });
    },
};
