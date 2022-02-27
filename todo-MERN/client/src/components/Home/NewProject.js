import {useState, useContext, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../Context/ContextProvider";


const NewProject = () => {
    const {state, setProject, status, handlePopup} = useContext(Context)
    const [newProject, setNewProject] = useState({
        name: "",
        status: status
    })
    const navigate = useNavigate()

    const onChange = (event) => {
        event.preventDefault()
        setNewProject({...newProject, [event.target.name]: event.target.value})
    }

    const createProject = useCallback(async (event) =>{
        event.preventDefault()

        try{
            const response = await fetch("http://localhost:5000/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                },
                body: JSON.stringify(newProject)
            })

            const project = await response.json()
            console.log(project)
            setProject(project)
            navigate("/project")
        }catch (e) {
            throw e.message
        }

    }, [newProject])

    useEffect(() =>{
    })

    return(
        <div className={"popup-box"}>
            <div className={"box"}>
                <span className={"close-icon"} onClick={handlePopup}>X</span>

                <form>
                    <label htmlFor={"name"}>Project Name </label>
                    <input id={"name"} type="text" name={"name"} className={"mx-2"} onChange={onChange}/>

                    <button type={"submit"} onClick={createProject}>Creat Project</button>
                </form>
            </div>
        </div>
    )
}

export default NewProject