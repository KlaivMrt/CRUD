import React, {useEffect} from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/store"
import {setActiveProjects} from "../context/activeProjects";
import {setArchivedProjects} from "../context/archivedProjects";
import {setCompletedProjects} from "../context/completedProjects";
import {ProjectModel} from "../data/models";

const Home: React.FC = () => {
    let active: ProjectModel[] = [];
    let archived: ProjectModel[] = [];
    let completed: ProjectModel[] = [];

    const user = useSelector((state: RootState) => state.userReducer.value);
    const dispatch = useDispatch();

    const getProjects = async () =>{
        const response = await fetch(`http://localhost:5000/api/todo/get-projects/${user.id}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const projects: ProjectModel[] = await response.json();
        for (let i = 0; i < projects.length; i++) {
            if(projects[i].completed === 1){
                completed.push(projects[i])
            }else{
                if(projects[i].active === 1){
                    active.push(projects[i]);
                }else{
                    archived.push(projects[i]);
                }
            }
        };

        dispatch(setActiveProjects(active));
        dispatch(setArchivedProjects(archived));
        dispatch(setCompletedProjects(completed));
        // console.log(projects);
        // console.log(active);
        // console.log(archived);
        // console.log(completed);
    }

    useEffect(() =>{
        getProjects();
    });

    return(
        <div id="home">
            < Header/>

            < Outlet/>
        </div>
    )
}

export default Home;