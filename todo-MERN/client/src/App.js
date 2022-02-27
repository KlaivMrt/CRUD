import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./components/Authentication/Register"
import Login from "./components/Authentication/Login"
import Home from "./components/Home/Home"
import Welcome from "./components/Welcome";
import ContextProvider from "./components/Context/ContextProvider";
import Tasks from "./components/Project/Tasks";
import History from "./components/Project/History";
import ActiveProjects from "./components/Home/ActiveProjects";
import ArchiveProjects from "./components/Home/ArchiveProjects";
import Completed from "./components/Home/Completed";
import "./App.css"

const App = () => {
    return(
        <div className={"h-100"}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path={"/"} element={<ContextProvider><Welcome/></ContextProvider>} />
                        <Route exact path={"/register"} element={<ContextProvider><Register/></ContextProvider>} />
                        <Route exact path={"/login"} element={<ContextProvider><Login/></ContextProvider>} />

                        <Route exact path={"/home"} element={<ContextProvider><Home/></ContextProvider>} >
                            <Route exact path={"/home/active"} element={<ActiveProjects/>}/>
                            <Route exact path={"/home/archive"} element={<ArchiveProjects/>}/>
                            <Route exact path={"/home/completed"} element={<Completed/>}/>
                        </Route>

                        <Route exact path={"/project"} element={<ContextProvider><Tasks/></ContextProvider>} />
                        <Route exact path={"/history"} element={<ContextProvider><History/></ContextProvider>} />
                    </Routes>
                </BrowserRouter>
        </div>
    )
}
export default App