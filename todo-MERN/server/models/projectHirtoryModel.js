import mongoose from "mongoose"

const projectHistorySchema = new mongoose.Schema({
    projectId: {type: String, require: true},
    name: {type: String, required: true},
    desc: {type: String}
})

const ProjectHistory = mongoose.model("histories", projectHistorySchema)
export default ProjectHistory