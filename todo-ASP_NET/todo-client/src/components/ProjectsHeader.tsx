import React from "react";
import {BiBox, BiHive} from "react-icons/bi";
import {BsPlusCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom"

interface Props{
    title: string
}

const ProjectsHeader: React.FC<Props> = ({title}) =>{

    const navigate = useNavigate();
    
    return(
        <div id="projects__header">
            <h3>{title} Projects</h3>

            <div className="icons">
                {
                    title === "Active" ? < BiHive onClick={() => navigate("/home/archived")}/>
                    : < BiBox onClick={() => navigate("/home/active")}/>
                }        

                < BsPlusCircleFill/>
            </div>
        </div>
    );
}

export default ProjectsHeader;