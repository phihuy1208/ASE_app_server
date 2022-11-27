import express from "express";
import authController from "../controllers/authController.js";
import { verifyToken } from "../groups/internalServices.js";

const router = express.Router();

router.post("/register", authController.userRegistration);
router.use("/login", authController.userLogin);
router.use("/verify/:token", authController.saveVerifiedEmail);
router.put("/", verifyToken, authController.changeInformation);

export default router;
