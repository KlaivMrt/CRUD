import React from "react";
import ProjectsHeader from "./ProjectsHeader";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import AAProjectWrapper from "./AAProjectWrapper"

const ActiveProjects: React.FC = () => {

    const activeProjects = useSelector((state: RootState) => state.activeProjectsReducer.value);

    return(
        <div id="active__projects">
            <ProjectsHeader title="Active"/>

            {
                activeProjects.map((project, index) => < AAProjectWrapper project={project} tag={"active"} index={index} key={index}/>)
            }
            
        </div>
    );
}

export default ActiveProjects;