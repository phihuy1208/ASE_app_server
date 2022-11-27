import GroupsModel from "./groups.model.js";

export const groupsErrors = {
  G001: "Group name already exists",
  G002: "GroupID or UserID is not exists",
  G003: "Just owner or co-owner of group can invive user join group",
};

export const isGroupNameExist = async (groupName) => {
  try {
    const group = await GroupsModel.findOne({ name: groupName }).exec();
    return group !== null;
  } catch (err) {
    err.stack;
  }
};

export const isGroupIdExist = async (groupId) => {
  try {
    const group = await GroupsModel.findOne({ _id: groupId }).exec();
    return group;
  } catch (err) {
    err.stack;
  }
};

export { isUserIdsExist, getUserName } from "../users/internalServices.js";
export { default as verifyToken } from "../middlewares/index.js";
