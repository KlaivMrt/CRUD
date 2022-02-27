import {useContext, useEffect, useState} from "react";
import {Context} from "../Context/ContextProvider";

const Completed = () => {
    const {state, completedProjects, activeProjects, setActiveProjects, setCompletedProjects, deleteProject} = useContext(Context)

    const uncheckProject = async (index) => {
        try{
            const completed = [...completedProjects]
            const active = [...activeProjects]

            for (let i = 0; i < completed.length; i++){
                if (i === index){
                    let project = completed.splice(i, 1)
                    project[0]["status"] = 0
                    console.log(project[0])

                    active.push(project[0])
                    console.log(active)

                    setCompletedProjects(completed)
                    setActiveProjects(active)

                    await fetch(`http://localhost:5000/project/update-project/${project[0]._id}`,{
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": state.token
                        },
                        body: JSON.stringify(project[0])
                    })
                }
            }
        }catch (e) {
            throw e
        }
    }

    useEffect(() =>{
        console.log(completedProjects)
    })
    return(
        <div className={"row h-75"}>
            <div className={"d-flex flex-row justify-content-around align-items-center"}>
                <h3 className={"my-1"}>Completed</h3>
            </div>

            <div className={"col bg-light h-100 border-top overflow-auto align-self-center"}>
                {completedProjects.map((project, index) =>
                    <div key={index} id={"project"} className={"bg-white d-flex justify-content-between align-items-center px-5 mx-5 my-2 h5"}>
                        {project.name}
                        <div id={"icons"}>
                            <i id={"un-list"} className={"bi bi-caret-left h4 my-0"} onClick={(event) =>{
                                if (event.target.id === "un-list") uncheckProject(index)
                            }}>
                            </i>
                            <i id={"trash"} className={"bi bi-trash2-fill h4 my-0"} onClick={(event) =>{
                                if (event.target.id === "trash") deleteProject(index, project.status)
                            }}>
                            </i>
                        </div>

                    </div>
                )}
            </div>

        </div>
    )
}

export default Completed