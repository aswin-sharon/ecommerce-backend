import { Router } from "express";
import { CategoryController } from "./CategoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create", protect, CategoryController.create);
router.get("/list", protect, CategoryController.list);
router.get("/get/:id", protect, CategoryController.get);
router.put("/update/:id", protect, CategoryController.update);
router.delete("/remove/:id", protect, CategoryController.remove);

export default router;
