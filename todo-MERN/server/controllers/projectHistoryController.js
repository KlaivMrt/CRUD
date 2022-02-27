import ProjectHistory from "../models/projectHirtoryModel.js";

export const addTask = async (req, res) => {
  try {
      const {projectId, name, desc} = req.body

      if (!projectId) return res.status(400).json({message: "No project ID detected"})
      if (!name) return res.status(400).json({message: "No task name detected"})

      const addedTask = await new ProjectHistory({
          projectId: projectId,
          name: name,
          desc: desc
      })

      await addedTask.save()
      res.json(addedTask)

  }catch (e) {
      return res.status(500).json({error: e.message})
  }
}

export const getTasks = async (req, res) => {
    try {
        const projectId = req.params.pid

        if (!projectId) return res.status(400).json({message: "No project ID detected"})

        const tasks = await ProjectHistory.find({projectId: projectId})

        res.json(tasks)
    }catch (e) {
        return res.status(500).json({error: e.message})
    }
}

export const deleteTask = async (req, res) =>{
    try {
        const id = req.params.id

        if (!id) return res.status(400).json({message: "No task ID found"})

        const deleted = await ProjectHistory.findByIdAndDelete(id)

        res.json(deleted)
    }catch (e) {
        return res.status(500).json({error: e.message})
    }
}