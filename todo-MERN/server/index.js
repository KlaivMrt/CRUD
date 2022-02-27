import express from "express"
import parser from "body-parser"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"

import userRouter from "./routes/user.js";
import projectRouter from "./routes/project.js";
import taskRouter from "./routes/task.js";
import projectHistoryRouter from "./routes/projectHistory.js";

const app = express()
dotenv.config()

const PORT = process.env.PORT

app.use(parser.json())
app.use(cors())

app.use("/credentials", userRouter)
app.use("/project", projectRouter)
app.use("/task", taskRouter)
app.use("/project-history", projectHistoryRouter)


mongoose.connect(process.env.MONGO_CONN)
    .then(() =>{
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    })



