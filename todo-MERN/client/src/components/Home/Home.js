import {useEffect, useContext, useState, useCallback} from "react";
import {Outlet} from "react-router-dom";
import {Context} from "../Context/ContextProvider";
import NewProject from "./NewProject"
import Header from "../Header";

const Home = () => {
    const {state, isOpen, setActiveProjects, setArchiveProjects, setCompletedProjects} = useContext(Context)

    const getProjects = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/project/get-projects/${state.userId}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "x-auth-token": state.token
                }
            })

            const data = await response.json()
            console.log(data)

            let active = []
            let archive = []
            const completed = []

            for (let i = 0; i < data.length; i++){
                if (data[i]["status"] === 0){
                    active.push(data[i])
                }else if (data[i]["status"] === 1){
                    archive.push(data[i])
                }else {
                    completed.push(data[i])
                }
            }

            setActiveProjects(active)
            setArchiveProjects(archive)
            setCompletedProjects(completed)
        }catch (e) {
            throw e
        }
    }, [setActiveProjects])


    useEffect(() =>{
        getProjects()
    }, [getProjects])

    return(
        <div id={"workplace-container"} className={"h-100"}>
            {
                isOpen ? <NewProject/> : <></>
            }

            <Header title={"Home"} username={state.username}/>

            <Outlet/>
        </div>

    )
}

export default Home
