import Category from "./CategoryModel.js";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export const CategoryService = {
  async create(data) {
    const slug = slugify(data.name);
    return await Category.create({ name: data.name, slug });
  },

  async list() {
    return await Category.find().sort({ createdAt: -1 });
  },

  async get(id) {
    return await Category.findById(id);
  },

  async update(id, data) {
    const slug = slugify(data.name);
    return await Category.findByIdAndUpdate(
      id,
      { name: data.name, slug },
      { new: true }
    );
  },

  async remove(id) {
    return await Category.findByIdAndDelete(id);
  },
};
