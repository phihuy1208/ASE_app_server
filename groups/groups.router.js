import express from "express";
import groupsController from "./groups.controller.js";
import { verifyToken } from "./internalServices.js";

const groupsRouter = express.Router();

groupsRouter.post("/", verifyToken, groupsController.create);
groupsRouter.get("/", verifyToken, groupsController.list);
groupsRouter.patch("/", verifyToken, groupsController.inviteUser);
groupsRouter.patch("/members", verifyToken, groupsController.addMembers);
groupsRouter.patch("/co_owners", verifyToken, groupsController.addCo_owners);
groupsRouter.post(
  "/invite",
  verifyToken,
  groupsController.sendEmailToInviteUser
);

export default groupsRouter;
