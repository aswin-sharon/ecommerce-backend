import prisma from "../config/prisma.js";
import { slugify } from "../utils/slugify.js";

const CategoryDB = prisma.category;

// TODO: make it generic and reusable for other services
const parseCategoryId = (id) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new Error("Invalid category id");
  }

  return parsedId;
};

class CategoryService {
  // Create category
  async create(data) {
    if (!data?.name || !String(data.name).trim()) {
      throw new Error("Category name is required");
    }

    const name = String(data.name).trim();
    const slug = slugify(name);

    const existingCategory = await CategoryDB.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    return await CategoryDB.create({
      data: {
        name,
        slug,
        description: data.description ?? "",
      },
    });
  }

  // Get all categories
  async list() {
    return await CategoryDB.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  }

  // Get category by id
  async get(id) {
    const categoryId = parseCategoryId(id);

    return await CategoryDB.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  // Update category
  async update(id, data) {
    const categoryId = parseCategoryId(id);

    const existingCategory = await CategoryDB.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      throw new Error("Category not found");
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
      throw new Error("No valid category fields provided");
    }

    return await CategoryDB.update({
      where: {
        id: categoryId,
      },
      data: updateData,
    });
  }

  // Delete category
  async remove(id) {
    const categoryId = parseCategoryId(id);

    const existingCategory = await CategoryDB.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    await CategoryDB.delete({
      where: {
        id: categoryId,
      },
    });

    return {
      message: "Category deleted successfully",
    };
  }
}

export default new CategoryService();