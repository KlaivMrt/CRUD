import React from "react";
import ProjectsHeader from "./ProjectsHeader";
import AAProjectWrapper from "./AAProjectWrapper";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


const ArchivedProjects: React.FC = () => {
    const archivedProjects = useSelector((state: RootState) => state.archivedProjectsReducer.value);

    return(
        <div id="archived__projects">
            <ProjectsHeader title="Archived"/>

            {
                archivedProjects.map((project, index) => < AAProjectWrapper project={project} tag={"archived"} index={index} key={index}/>)
            }
            
        </div>
    );
}

export default ArchivedProjects;