import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../Context/ContextProvider";


const ActiveProjects = () => {
    const {deleteProject, showProject, setProject, handlePopup, activeProjects, setStatus, completeProject} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() =>{
        setStatus(0)
    })

    return(
      <div className={"row active-projects h-75"}>
          <div className={"d-flex flex-row justify-content-around align-items-center"}>
              <i id={"active"} className={"bi bi-archive-fill h2"} onClick={() => navigate("/home/archive")}>
              </i>

              <h3 className={"my-1"}>Active Projects</h3>

              <i id={"plus"} className={"bi bi-plus-circle h2 my-1"} onClick={handlePopup}>
              </i>
          </div>

          <div className={"col bg-light h-75 border-top overflow-auto align-self-center"}>
              {activeProjects.map((project, index) =>
                  <div key={index} id={"project"} className={"bg-white d-flex justify-content-between align-items-center px-5 mx-5 my-2 h5"} onClick={(event) =>{
                      if (event.target.id === "project") showProject(index, project.status)
                  }}>
                      {project.name}
                      <div id={"icons"}>
                          <i id={"history"} className={"bi bi-journal-x h4 my-0"} onClick={(event) =>{
                              if (event.target.id === "history") {
                                  setProject(project)
                                  navigate('/history')
                              }
                          }}>
                          </i>
                          <i id={"complete"} className={"bi bi-file-check h4 my-0"} onClick={(event) => {
                              if (event.target.id === "complete") completeProject(index, project.status)
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

export default ActiveProjects