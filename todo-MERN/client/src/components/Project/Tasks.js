import {useContext, useState, useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import NewTask from "./NewTask";
import Sidebar from "./Sidebar";
import EditTask from "./EditTask";
import EditProject from "../Home/EditProject"
import Header from "../Header";
import {Context} from "../Context/ContextProvider";

const Tasks = () => {
    const {state, project, setTask} = useContext(Context)
    const [tasks, setTasks] = useState([])
    const [openNew, setOpenNew] = useState(false)
    const [openEditTask, setOpenEditTask] = useState(false)
    const [openEditProject, setOpenEditProject] = useState(false)
    const navigate = useNavigate()

    const getTasks = useCallback(async () => {
        try{
            const response = await fetch(`http://localhost:5000/task/get-tasks/${project._id}`, {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                }
            })

            const t = await response.json()
            setTasks(t)
        }catch (e){
            throw e
        }
    }, [setTasks])

    const showTask = (index) => {
        setTask(tasks[index])
        setOpenEditTask(!openEditTask)
    }

    const deleteTask = async (index) => {
        const taskId = tasks[index]["_id"]
        try {
            const response = await fetch(`http://localhost:5000/task/delete-task/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                }
            })

            // const deletedTask = await response.json()

            const t = [...tasks]
            for (let i = 0; i < t.length; i++){
                if (i === index){
                    t.splice(i, 1)
                    setTasks(t)
                }
            }
        }catch (e) {
            throw e.message
        }
    }

    const completeTask = useCallback( async (index) => {
        const task = tasks[index]
        try {
            const response = await fetch("http://localhost:5000/project-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                },
                body: JSON.stringify(task)
            })

            let t = await response.json()
            console.log(t)

            await deleteTask(index)

        }catch (e) {
            throw e.message
        }
    }, [tasks])

    // Handle functions for the visibility of the Project
    const handleNewTask = () => {
        setOpenNew(!openNew)
    }
    const handleEditTask = () => {
        setOpenEditTask(!openEditTask)
    }
    const handleEditProject = () => {
        setOpenEditProject(!openEditProject)
    }

    useEffect(() =>{
        getTasks()
    }, [getTasks])

    return(
        <div id={"projects-container"} className={"h-100"}>

            <Header title={"Workplace"} username={state.username}/>

                {openNew ? <NewTask close={handleNewTask} tasks={tasks} setTasks={setTasks}/> : <></>}
                {openEditTask ? <EditTask close={handleEditTask} tasks={tasks} setTasks={setTasks}/> : <></>}
                {openEditProject ? <EditProject close={handleEditProject}/> : <></>}

            <header className={"d-flex flex-row justify-content-between align-items-center px-3 mt-2"}>
                <div className={"bg-light text-center w-50 h1"}>{project.name ? project.name : "No Project"}</div>
                <i id={"edit"} className={"bi bi-pen h4 my-0"} onClick={handleEditProject}>
                </i>
                {/*<h1 id={"project-name"} className={"bg-light text-center"}>{project.name ? project.name : "No Project"}</h1>*/}
            </header>

            <div className={"row h-75 vw-100"}>
                    <Sidebar open={handleNewTask} showHistory={() => navigate("/history")}/>

                    <div id={"tasks"} className={"col-8 offset-1 bg-light h-100 overflow-auto px-2 mx-2"}>
                        {tasks.map((task, index) =>
                            <div id={"task"} className={"bg-white d-flex justify-content-between align-items-center px-2 mx-2 my-1 h4"} key={index} onClick={(event) =>{
                                if (event.target.id === "task") showTask(index)
                            }}>
                                {task.name}
                                <div id={"icons"}>
                                    <i id={"complete"} className={"bi bi-file-check h4 my-0"} onClick={() => completeTask(index)}>
                                    </i>
                                    <i id={"trash"} className={"bi bi-trash2-fill h4 my-0"} onClick={(event) =>{
                                        if (event.target.id === "trash") deleteTask(index)
                                    }}>
                                    </i>
                                </div>
                            </div>
                        )}
                    </div>

            </div>

        </div>
    )
}

export default Tasks