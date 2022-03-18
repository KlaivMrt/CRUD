import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import CProjectWrapper from "./CProjectWrapper";

const CompletedProjects: React.FC = () => {

    const completedProjects = useSelector((state: RootState) => state.completedProjectsReducer.value);

    return(
        <div id="complted__projects">

            <h2>Completed Projects</h2>

            {
                completedProjects.map((project, index) => < CProjectWrapper project={project} index={index} key={index}/>)
            }
        </div>
    );
}

export default CompletedProjects;