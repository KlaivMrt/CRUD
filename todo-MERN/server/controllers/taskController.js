import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try{
      const {projectId, name, desc, completed} = req.body

      if (!name) return res.status(400).json({message: "Task name is mandatory."})

      const newTask = new Task({
          projectId: projectId,
          name: name,
          desc: desc ? desc : "",
          completed: completed ? completed : false
      })

      await newTask.save()

      res.json(newTask)

  }catch (e) {
      return res.status(500).json({error: e.message})
  }
}

export const getTask = async (req, res) => {
  try {
      const taskId = req.params.id
      const task = await Task.findOne({_id: taskId})
      res.json(task)

  }catch (e) {
      return res.status(500).json({error: e.message})
  }
}

export const getTasks = async (req, res) => {
  try {
      const projectID = req.params.pid

      const tasks = await Task.find({projectId: projectID})
      res.json(tasks)
  }catch (e) {
      return res.status(500).json({error: e.message})
  }
}

export const updateTask = async (req, res) =>{
    try{
        const id = req.params.id

        if (!id) return res.status(400).json({message: "No Task id detected."})

        const updated = await Task.findByIdAndUpdate(id, {
            name: req.body.name,
            desc: req.body.desc
        },{
            returnOriginal: false
        })

        res.json(updated)

    }catch (e) {
        return res.status(500).json({error: e.message})
    }
}

export const deleteTask = async (req, res) => {

    try {
        const id = req.params.id

        if (!id) return res.status(400).json({message: "No Task id detected."})

        const deleted = await Task.findByIdAndDelete(id)

        res.json(deleted)

    }catch (e) {
        return res.status(500).json({error: e.message})
    }
}