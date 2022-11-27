import groupsService from "./groups.service.js";

class GroupController {
  create = async (req, res) => {
    try {
      console.log(req.body);
      const { userId, groupName } = req.body;

      //check
      res.status(201).json(await groupsService.create(userId, groupName));
    } catch (err) {
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };

  list = async (req, res) => {
    try {
      const { userId, isOwner } = req.body;
      // check
      res.status(201).json(await groupsService.list(userId, isOwner));
    } catch (err) {
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };

  inviteUser = async (req, res) => {
    try {
      const { userId, groupId } = req.body;
      // check

      res.status(201).json(await groupsService.inviteUser(userId, groupId));
    } catch (err) {
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };

  addMembers = async (req, res) => {
    try {
      const { listMembers, groupId } = req.body;
      // check

      res
        .status(201)
        .json(await groupsService.addMembers(listMembers, groupId));
    } catch (err) {
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };

  addCo_owners = async (req, res) => {
    try {
      const { listMembers, groupId } = req.body;
      // check

      res
        .status(201)
        .json(await groupsService.addCo_owners(listMembers, groupId));
    } catch (err) {
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };

  sendEmailToInviteUser = async (req, res) => {
    try {
      const { email, groupId } = req.body;
      console.log(email, groupId);
      res
        .status(201)
        .json(await groupsService.sendEmailToInviteUser(email, groupId));
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };
}

export default new GroupController();
