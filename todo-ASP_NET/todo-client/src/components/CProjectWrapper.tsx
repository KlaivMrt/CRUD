import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ProjectModel} from "../data/models";
import { BsCheck2Circle, BsSave2 } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import {removeCompletedProjects} from "../context/completedProjects";
import {RootState} from "../store/store"

interface Props{
    project: ProjectModel;
    index: number;
}

const CProjectWrapper: React.FC<Props> = ({project,  index}) =>{

    const projects = useSelector((state: RootState) => state.completedProjectsReducer.value);
    const dispatch = useDispatch();

    const deleteProject = async () => {

        dispatch(removeCompletedProjects(index));


        const responce = await fetch(`http://localhost:5000/api/todo/delete-project/${project.id}`,{
            method: "DELETE"
        });
        console.log(responce);
    }

    const reActivate = async () => {
        let upProject = projects[index];
        upProject.active = 1;
        upProject.completed = 0;

        const responce = await fetch("http://localhost:5000/api/todo/put-project", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(upProject)
        });

        upProject = await responce.json()

        console.log(upProject);
    }

    return(
        <div className="project__wrapper">
            <span>{project.projectName}</span>

            <span className="icons">
                < BsSave2 onClick={reActivate}/>
                < BsCheck2Circle />
                < IoTrashBinOutline
                onClick={deleteProject}
                />
            </span>
        </div>
    );
}

export default CProjectWrapper;