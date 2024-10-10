const express = require("express");

const { signUp, login } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/get-user", login);

module.exports = userRouter;
