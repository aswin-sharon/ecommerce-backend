console.log("hittin inside?????");
import express from "express";
const router = express.Router();
import UserController from "./UserController.js";

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
