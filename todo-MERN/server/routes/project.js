import express from "express";
import {createProject, getProjects, getProject, updateProject, deleteProject} from "../controllers/projectController.js";
import {auth} from "../middleware/auth.js"

const projectRouter = express.Router()

// @method    POST /project
// @desc     Creates a new Project
// @access   Private
projectRouter.post("/", auth, createProject)

// @method    GET
// @desc     Gets the data from a selected Project
// @access   Private
projectRouter.get("/get-project/:id", auth, getProject)

// @method    GET
// @desc     Gets all the projects
// @access   Private
projectRouter.get("/get-projects/:uid", auth, getProjects)

// @method    PUT
// @desc     Updates the data of a selected Project
// @access   Private
projectRouter.put("/update-project/:id", auth, updateProject)

// @method    DELETE
// @desc     Deletes the selected Project
// @access   Private
projectRouter.delete("/delete-project/:id", auth, deleteProject)

export default projectRouter
