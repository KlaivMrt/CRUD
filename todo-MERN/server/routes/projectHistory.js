import express from "express";
import {auth} from "../middleware/auth.js";
import {addTask, getTasks, deleteTask} from "../controllers/projectHistoryController.js"

const projectHistoryRouter = express.Router()

// @method  POST
// @desc    Adds into the history of a project a completed task
// @access  Private
projectHistoryRouter.post("/", auth, addTask)

// @method  GET
// @desc    Gets all the completed tasks of a project
// @access  Private
projectHistoryRouter.get("/get-tasks/:pid", auth, getTasks)

// @method  DELETE
// @desc    Deletes the selected task
// @access  Private
projectHistoryRouter.delete("/delete-task/:id", auth, deleteTask)

export default projectHistoryRouter