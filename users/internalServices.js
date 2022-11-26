import UsersModel from "./users.model.js";

export const isUserIdsExist = async (listUserIds) => {
  try {
    const listAllUserIds = (await UsersModel.find({}, { _id: 1 }).exec()).map(
      (item) => item._id.toString()
    );
    return listUserIds.every((userId) => listAllUserIds.includes(userId));
  } catch (err) {
    console.log(err.stack);
  }
};

export const getUserName = async (userId) => {
  try {
    return (
      await UsersModel.findOne({ _id: userId }, { name: 1, _id: 0 }).exec()
    ).name;
  } catch (err) {
    console.log(err.stack);
  }
};
