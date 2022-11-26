import GroupsModel from "./groups.model.js";
import { groupsErrors, isGroupNameExist, isGroupIdExist, isUserIdsExist } from "./internalServices.js";

class GroupsService {
  create = async (userId, groupName) => {
    try {
      if (!(await isGroupNameExist(groupName))){
        const newGroup = new GroupsModel({ name: groupName, owner: userId, co_owners: [], members: [userId] });
        await newGroup.save();
        return {success: true}
      }
      else {
        return {success: false, errorCode: "G001",  errorMessage: groupsErrors["G001"]}
      }
    }
    catch (err) {
      console.log(err.stack)
    }
  }

  list = async (userId, isOwner) => {
    if (isOwner) {
      const listGroupOwner = await GroupsModel.find( {owner: userId}, {} )
      return {success: true, list: listGroupOwner}
    } 
    else {
      const listGroupJoined = await GroupsModel.find( {members: userId} )      
      return {success: true, list: listGroupJoined}
    }
  }

  inviteUser = async (userId, groupId) => {
    if (await (isGroupIdExist(groupId) && isUserIdsExist([userId]))) {
      await GroupsModel.updateOne( {_id: groupId }, {$addToSet: {members: userId}} )
      return {success: true}
    }
    else {
      return {success: false, errorCode: "G002", errorMessage: groupsErrors["G002"]}
    }
  }

  addMembers = async (listMembers, groupId) => {
    const group = await GroupsModel.findById(groupId).exec();
    
    if (await (isUserIdsExist(listMembers)) && group !== null) {
      listMembers.forEach(member => {
        if (!group.members.includes(member)) {
          group.members.push(member);
        };
      }); 

      await group.save();
      return {success: true}
    } else {
      return {success: false, errorCode: "G002", errorMessage: groupsErrors["G002"]}
    }
  }

  addCo_owners = async (listCo_owner, groupId) => {
    const group = await GroupsModel.findById(groupId).exec();
    
    if (await (isUserIdsExist(listCo_owner)) && group !== null) {
      listCo_owner.forEach(member => {
        if (!group.co_owners.includes(member)) {
          group.co_owners.push(member);
        };

        if (!group.members.includes(member)) {
          group.members.push(member);
        };
      }); 

      await group.save();
      return {success: true}
    } else {
      return {success: false, errorCode: "G002", errorMessage: groupsErrors["G002"]}
    }
  }
}

export default new GroupsService()