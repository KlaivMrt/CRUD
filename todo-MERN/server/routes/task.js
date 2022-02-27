import express from "express";
import {auth} from "../middleware/auth.js"
import {createTask, getTask, getTasks, updateTask, deleteTask} from"../controllers/taskController.js"


const taskRouter = express.Router()

// @method    POST
// @desc     Creates a new Task
// @access   Private
taskRouter.post("/", auth, createTask)

// @method    GET
// @desc     Gets the data of a selected Task
// @access   Private
taskRouter.get("/get-task/:id", auth, getTask)

// @method    GET
// @desc     Gets all the Project of a selected Project
// @access   Private
taskRouter.get("/get-tasks/:pid", auth, getTasks)

// @method    PUT
// @desc     Updates the data from a selected Task
// @access   Private
taskRouter.put("/update-task/:id", auth, updateTask)

// @method    DELETE
// @desc     Deletes the selected Task
// @access   Private
taskRouter.delete("/delete-task/:id", auth, deleteTask)

export default taskRouter
