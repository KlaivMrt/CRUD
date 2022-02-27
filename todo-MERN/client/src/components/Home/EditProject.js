import {useState, useCallback, useContext} from "react";
import {Context} from "../Context/ContextProvider";

const EditProject = (props) => {
    const {project, setProject, state} = useContext(Context)
    const [editedProject, setEditedProject] = useState(project)

    const onChange = (event) => {
        event.preventDefault()
        setEditedProject({...editedProject, [event.target.name]: event.target.value})
    }

    const updateProject = useCallback (async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/project/update-project/${project._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                },
                body: JSON.stringify(editedProject)
            })

            const up = await response.json()
            setProject(up)
            props.close()

        }catch (e) {
            throw e.message
        }
    }, [editedProject])

  return(
      <div className={"popup-box"}>
          <div className={"box"}>
              <span className={"close-icon"} onClick={props.close}>X</span>

              <form>
                    <h3>{project.name}</h3>
                    <input type="text" name={"name"} placeholder={"new name"} onChange={onChange}/>
                    <button onClick={updateProject}>Make changes</button>
              </form>

          </div>
      </div>

  )
}

export default EditProject