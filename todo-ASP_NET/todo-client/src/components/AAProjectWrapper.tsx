import React from "react";
import {useDispatch ,useSelector} from "react-redux";
import {RootState} from "../store/store"
import {ProjectModel} from "../data/models";
import { BsCheck2Circle } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import {removeActiveProject} from "../context/activeProjects";
import {removeArchivedProject} from "../context/archivedProjects";
import {addCompletedProject} from "../context/completedProjects"

interface Props{
    project: ProjectModel;
    tag: string;
    index: number;
}

const AAProjectWrapper: React.FC<Props> = ({project, tag, index}) =>{

    const dispatch = useDispatch();
    const active = useSelector((state: RootState) => state.activeProjectsReducer.value);

    const deleteProject = async () => {
        switch(tag){
            case "active":
                dispatch(removeActiveProject(index))
                break;
            case "archived":
                dispatch(removeArchivedProject(index));
                break;
        }

        const responce = await fetch(`http://localhost:5000/api/todo/delete-project/${project.id}`,{
            method: "DELETE"
        });
        console.log(responce);
    }

    const complete = async () => {
        let upProject: ProjectModel = active[index];
        console.log(upProject);
        upProject.completed = 1;

        const responce = await fetch("http://localhost:5000/api/todo/put-project", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(upProject)
        });

        const p = await responce.json();
        console.log(p);

        dispatch(addCompletedProject(p));
    }

    return(
        <div className="project__wrapper">
            <span>{project.projectName}</span>

            <span className="icons">
                {
                    tag === "active" ? < BsCheck2Circle
                    onClick={complete}/>
                    : <></>
                }
                
                < IoTrashBinOutline onClick={deleteProject}/>
            </span>
        </div>
    );
}

export default AAProjectWrapper;