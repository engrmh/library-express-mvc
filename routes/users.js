const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/").get(userController.getAll);
userRouter.route("/upgrade/:id").put(userController.upgradeUser);
userRouter.route("/crime/:id").put(userController.crimingUser);
userRouter.route("/register").post(userController.register);
userRouter
  .route("/:id")
  .delete(userController.removeOne)
  .get(userController.getOneUser);

module.exports = userRouter;
