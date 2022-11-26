const  express = require("express");
const usersRouter = express.Router();

const usersController = require("./users.controller");

usersRouter.get("/", usersController.list);


module.exports = usersRouter;