console.log("hittin inside????? user routes");
import express from "express";
const router = express.Router();
import UserController from "./UserController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/:id", protect, UserController.getUserById);
router.get("/getAllRecords", protect, UserController.getAllUsers);

export default router;
