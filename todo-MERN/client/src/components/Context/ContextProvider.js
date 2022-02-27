import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export const Context = createContext()

const ContextProvider = (props) => {
    const [user, setUser] = useState({
        token: "",
        username: "",
        userId: "",
    })
    const [selectedProject, setSelectedProject] = useState({})
    const [selectedTask, setSelectedTask] = useState({})

    const [activeProjects, setActiveProjects] = useState([])
    const [archivedProjects, setArchivedProjects] = useState([])
    const [completedProjects, setCompletedProjects] = useState([])

    const [activeTasks, setActiveTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    const [status, setStatus] = useState()
    const [openNewProject, setOpenNewProject] = useState(false)
    const navigate = useNavigate()


    const showProject = (index, status) => {
        console.log(index)
        console.log(status)
        if (status === 0){
            setSelectedProject(activeProjects[index])
        }else if (status === 1){
            setSelectedProject(archivedProjects[index])
        }
        navigate("/project")
    }

    const deleteProject = async (index, status) => {
        let setProjects;
        let projects
        if (status === 0){
            projects = [...activeProjects]
            setProjects = setActiveProjects
        }else if (status === 1){
            projects = [...archivedProjects]
            setProjects = setArchivedProjects
        }else if (status === 2){
            projects = [...completedProjects]
            setProjects = setCompletedProjects
        }

        try {
            // Deletes the selected project from the database
            const response1 = await fetch(`http://localhost:5000/project/delete-project/${projects[index]["_id"]}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user.token
                }
            })

            // Deletes the selected project from the array that holds them all and updates it
            for (let i = 0; i<projects.length; i++){
                if (i === index){
                    projects.splice(i, 1)
                    setProjects(projects)
                }
            }

            const deletedProject = await response1.json()

            // Gets all tasks of this project from the database
            const tasksToBeDeleted = await fetch(`http://localhost:5000/task/get-tasks/${deletedProject._id}`, {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "x-auth-token": user.token
                }
            })

            const activeTasks = await tasksToBeDeleted.json()
            console.log(activeTasks)

            // Deletes all tasks of the selected project from the database
            if (activeTasks.length > 0){
                for (let i = 0; i < activeTasks.length; i++){
                    await fetch(`http://localhost:5000/task/delete-task/${activeTasks[i]["_id"]}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": user.token
                        }
                    })
                }
            }

            // Gets all the history tasks, of the selected project, stored in the history database
            const response2 = await fetch(`http://localhost:5000/project-history/get-tasks/${deletedProject._id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user.token
                }
            })

            const historyTasks = await response2.json()

            // Deletes all the history tasks, of the selected project, from the database
            if (historyTasks.length > 0){
                for (let i = 0; i < historyTasks.length; i++){
                    await fetch(`http://localhost:5000/project-history/delete-task/${historyTasks[i]["_id"]}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": user.token
                        }
                    })
                }
            }

        }catch (e) {
            throw e
        }
    }

    const completeProject = async (index, status) => {
        let setProjects;
        let projects
        if (status === 0){
            projects = [...activeProjects]
            setProjects = setActiveProjects
        }else if (status === 1){
            projects = [...archivedProjects]
            setProjects = setArchivedProjects
        }
        try {
            const completedList = [...completedProjects]

            for (let i = 0; i < projects.length; i++){
                if (i === index){
                    const project = projects.splice(i, 1)
                    project[0].status = 2
                    console.log(project[0].status)
                    console.log(project[0])

                    const response = await fetch(`http://localhost:5000/project/update-project/${project[0]._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": user.token
                        },
                        body: JSON.stringify(project[0])
                    })

                    const updated = await response.json()
                    console.log("updated")
                    console.log(updated)

                    completedList.push(project[0])
                    setProjects(projects)
                    setCompletedProjects(completedList)
                }
            }

        }catch (e) {
            throw e
        }
    }

    // Handles the Popup Component
    const handlePopup = () => {
        setOpenNewProject(!openNewProject)
    }


    useEffect(() =>{
        setOpenNewProject(false)
    }, [selectedProject])

    return(
        <Context.Provider value={{
            state: user,
            setState: setUser,
            project: selectedProject,
            setProject: setSelectedProject,
            task: selectedTask,
            setTask: setSelectedTask,
            status: status,
            setStatus: setStatus,
            isOpen: openNewProject,

            activeProjects: activeProjects,
            setActiveProjects: setActiveProjects,
            archiveProjects: archivedProjects,
            setArchiveProjects: setArchivedProjects,
            completedProjects: completedProjects,
            setCompletedProjects: setCompletedProjects,

            activeTasks: activeTasks,
            setActiveTasks: setActiveTasks,
            completedTasks: setCompletedTasks,

            deleteProject: deleteProject,
            showProject: showProject,
            handlePopup: handlePopup,
            completeProject: completeProject
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider