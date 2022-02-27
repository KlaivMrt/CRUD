import Project from "../models/projectModel.js";
import jwt from "jsonwebtoken"

export const createProject = async (req, res) =>{
    try{
        const token = req.header("x-auth-token")
        const {name, status} = req.body
        const user = jwt.decode(token).id


        if (!user) return res.status(400).json({message: "User id isn't attached."})

        if (!name) return res.status(400).json({message: "NewProject name required."})

        const newProject = new Project({
            user: user,
            name: name,
            status: status
        })

        await newProject.save()
        res.json(newProject)

    }catch (e) {
        return res.status(500).json({error: e.message})
    }
}

export const getProject = async (req, res) => {
    try {
        const projectId = req.params.id
        const project = await Project.findOne({_id: projectId})
        res.json(project)
    }catch (e){
        return res.status(500).json({error: e.message})
    }
}

export const getProjects = async (req, res) => {

    try{
        const userId = req.params.uid

        const projects = await Project.find({user: userId})
        res.json(projects)

    }catch (e) {
        return res.status(500).json({error: e.message})
    }
}

export const updateProject = async (req, res) => {
  try {
      const id = req.params.id

      if (!id) return res.status(400).json({message: "No Project id detected"})

      const {user, name, status} = req.body

      const updated = await Project.findByIdAndUpdate(id, {
          user: user,
          name: name,
          status: status
      },{
          returnOriginal: false
      })

      res.json(updated)

  }catch (e) {
      return res.status(500).json({error: e.message})

  }
}

export const deleteProject = async (req, res) => {
    try{
        const id = req.params.id

        if (!id) return res.status(400).json({message: "No Project id detected"})

        const deleted = await Project.findByIdAndDelete(id)

        res.json(deleted)
    }catch (e) {

    }
}
