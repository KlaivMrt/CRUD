import {useContext, useEffect, useState, useCallback} from "react";
import {Context} from "../Context/ContextProvider";
import Header from "../Header";

const History = () => {
    const {state, project} = useContext(Context)
    const [tasks, setTasks] = useState([])

    const getTasks = useCallback(async () => {
        const response = await fetch(`http://localhost:5000/project-history/get-tasks/${project._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": state.token
            }
        })

        const taskss = await response.json()
        setTasks(taskss)
        console.log(taskss)

    }, [setTasks])

    const deleteTask = async (index) => {
        const taskId = tasks[index]["_id"]
        try {
            const response = await fetch(`http://localhost:5000/project-history/delete-task/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                }
            })

            const deletedTask = await response.json()
            console.log(deletedTask)

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

    const uncheckTask = async (index) => {
        try {
            const unchecked = tasks[index]
            console.log()

            const response = await fetch(`http://localhost:5000/project-history/delete-task/${unchecked["_id"]}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                }
            })

            const deleted = await response.json()
            const taskss = [...tasks]

            for (let i = 0; i < taskss.length; i++){
                if (i === index){
                    taskss.splice(i,1)
                    setTasks(taskss)
                }
            }

            await fetch("http://localhost:5000/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                },
                body: JSON.stringify(deleted)
            })
      }catch (e) {
          throw e.message
      }
    }

    useEffect(() =>{
        getTasks()
    }, [getTasks])

    return(
        <div id={"history-container"} className={"h-100"}>

            <Header title={"History"} username={state.username}/>

            <div className={"container h-75 mt-5"}>
                <div className={"row bg-light h-100"}>
                    <div className={"col  align-self-start"}>
                        {tasks.map((task, index) => <div
                            id={"task"}
                            key={index}
                            className={"bg-white d-flex flex-row align-items-center justify-content-between my-2 px-3"}
                        >
                            {task.name}
                            <div id={"icons"}>
                                <i id={"un-list"} className={"bi bi-caret-left h4 my-0"} onClick={(event) =>{
                                    if (event.target.id === "un-list") uncheckTask(index)
                                }}>
                                </i>
                                <i id={"trash"} className={"bi bi-trash2-fill h4 my-0"} onClick={(event) =>{
                                    if (event.target.id === "trash") deleteTask(index)
                                }}>
                                </i>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History