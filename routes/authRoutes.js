import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.userRegistration);
router.use("/login", authController.userLogin);
router.use("/verify/:token", authController.saveVerifiedEmail);

export default router; 
