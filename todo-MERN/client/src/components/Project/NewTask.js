import {useContext, useState, useCallback} from "react";
import {Context} from "../Context/ContextProvider";

const NewTask = (props) => {
    const {state, project} = useContext(Context)

    const [newTask, setNewTask] = useState({
        projectId: project._id,
        name: "",
        desc: "",
        completed: false
    })

    const onChange = (event) => {
        event.preventDefault()
        setNewTask({...newTask, [event.target.name]: event.target.value})
    }

    const createTask = useCallback (async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                },
                body: JSON.stringify(newTask)
            })

            const nt = await response.json()

            const tasks = [...props.tasks]
            tasks.push(nt)
            props.close()
            props.setTasks(tasks)
        }catch (e){
            throw e.message
        }

    }, [newTask])

    return(
        <div className={"popup-box"}>
            <div className={"box"}>
                <span className={"close-icon"} onClick={props.close}>X</span>

                <form>
                    <label htmlFor={"name"}>Task Name </label>
                    <input id={"name"} type="text" name={"name"} className={"mx-2"} onChange={onChange}/>

                    <input id={"desc"} type="textarea" name={"desc"} className={"mx-2"} onChange={onChange}/>

                    <button type={"submit"} onClick={createTask}>Creat Task</button>
                </form>
            </div>
        </div>
    )
}

export default NewTask