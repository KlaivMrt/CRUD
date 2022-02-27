import {useState, useContext, useCallback} from "react";
import {Context} from "../Context/ContextProvider";

const EditTask = (props) => {
    const {state, task} = useContext(Context)
    const [editedTask, setEditedTask] = useState(task)

    const onChange = (event) => {
        event.preventDefault()
        setEditedTask({...editedTask, [event.target.name]: event.target.value})
    }

    const updateTask = useCallback (async (event) => {
        event.preventDefault()

        try {
            const updateTask = await fetch(`http://localhost:5000/task/update-task/${task._id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                },
                body: JSON.stringify(editedTask)
            })
            const upTask = await updateTask.json()
            const tasks = [...props.tasks]

            props.close()
            for (let i = 0; i < tasks.length; i++){
                if (tasks[i]["_id"] === upTask._id){
                    tasks.splice(i, 1, upTask)
                    props.setTasks(tasks)
                }
            }
        }catch (e) {
            throw e.message
        }
    }, [editedTask])

    return(
        <div className={"popup-box"}>
            <div className={"box"}>
                <span className={"close-icon"} onClick={props.close}>X</span>

                <form>
                    <h3>{task.name}</h3>
                    <input type="text" name={"name"} placeholder={"new name"} onChange={onChange}/>

                    <h3>Description</h3>
                    <input type="textarea" name={"desc"} placeholder={task.desc} onChange={onChange}/>
                    <button onClick={updateTask}>Make Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditTask