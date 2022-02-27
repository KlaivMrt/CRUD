import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    user: {type: String, required: true},
    name: {type: String, required: true},
    status: {type: Number}
})

const Project = mongoose.model("projects", projectSchema)
export default Project;