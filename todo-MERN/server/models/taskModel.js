import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    projectId: {type: String, require: true},
    name: {type: String, required: true},
    desc: {type: String},
    completed: false
})

const Task = mongoose.model("tasks", taskSchema)
export default Task;