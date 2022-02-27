import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 6},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
})



const UserModel = mongoose.model("users", userSchema)
export default UserModel