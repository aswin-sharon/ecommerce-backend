import prisma from "../config/prisma.js";
import { slugify } from "../utils/slugify.js";

const ProductDB = prisma.product;

// TODO: make it generic and reusable for other services
const parseProductId = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        throw new Error("Invalid product id");
    }

    return parsedId;
};

class ProductService {
    // Create product
    async create(data) {
        if (!data?.name || !String(data.name).trim()) {
            throw new Error("Product name is required");
        }

        const name = String(data.name).trim();
        const slug = slugify(name);

        const existingProduct = await ProductDB.findUnique({
            where: { slug },
        });

        if (existingProduct) {
            throw new Error("Product already exists");
        }

        return await ProductDB.create({
            data: {
                name,
                slug,
                description: data.description ?? "",
            },
        });
    }

    // Get all products
    async list() {
        return await ProductDB.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
    }

    // Get product by id
    async get(id) {
        const productId = parseProductId(id);

        return await ProductDB.findUnique({
            where: {
                id: productId,
            },
        });
    }

    // Update product
    async update(id, data) {
        const productId = parseProductId(id);

        const existingProduct = await ProductDB.findUnique({
            where: {
                id: productId,
            },
        });

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        const updateData = {};

        if (typeof data?.name === "string" && data.name.trim()) {
            updateData.name = data.name.trim();
            updateData.slug = slugify(data.name.trim());
        }

        if (Object.prototype.hasOwnProperty.call(data || {}, "description")) {
            updateData.description = data.description ?? "";
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error("No valid Product fields provided");
        }

        return await ProductDB.update({
            where: {
                id: productId,
            },
            data: updateData,
        });
    }

    // Delete product
    async remove(id) {
        const productId = parseProductId(id);

        const existingProduct = await ProductDB.findUnique({
            where: {
                id: productId,
            },
        });

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        await ProductDB.delete({
            where: {
                id: productId,
            },
        });

        return {
            message: "Product deleted successfully",
        };
    }
}

export default new ProductService();