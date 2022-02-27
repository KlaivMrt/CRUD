import express from "express";
import {userRegister, userLogin} from "../controllers/userController.js";

const userRouter = express.Router()

// @method    POST
// @desc     Registers a new user
// @access   Public
userRouter.post("/register", userRegister)

// @method    POST
// @desc     Logs in a user
// @access   Public
userRouter.post("/login", userLogin)

export default userRouter;