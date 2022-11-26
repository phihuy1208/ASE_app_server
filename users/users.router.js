import express from "express";
import usersController from "./users.controller.js";

const usersRouter = express.Router();


usersRouter.post("/register", usersController.userRegistration);
usersRouter.use("/login", usersController.userLogin);
usersRouter.use("/verify/:token", usersController.saveVerifiedEmail);

// usersRouter.get('/', usersController)
export default usersRouter;
