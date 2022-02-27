// import {useContext} from "react";
// import {Context} from "../Context/ContextProvider";


const Sidebar = (props) => {
    // const {task, project} = useContext(Context)

    return(
        <div id={"side-bar"} className={"bg-light col-2 offset-1 h-100"}>
            <div id={"item"} className={"my-3 bg-white w-100 rounded px-1"} onClick={props.open}>create task</div>
            <div id={"item"} className={"my-3 bg-white w-100 rounded px-1"} onClick={props.showHistory}>show history</div>
        </div>
    )
}

export default Sidebar