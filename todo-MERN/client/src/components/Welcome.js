
import {useNavigate} from "react-router-dom";

const Workplace = () => {
    const navigate = useNavigate()

    return(
        <div className={"container h-100"}>
            <div className={"row h-50 align-items-end"}>
                <div className={"row h-50 bg-light align-items-center"}>
                    <h1 className={"text-center"}>You're ToDo App</h1>
                </div>
            </div>
            <div className={"row h-25 mt-4"}>
                <div className={"col align-self-start d-flex flex-row justify-content-around"}>
                    <button onClick={(event) =>{
                        event.preventDefault()
                        navigate("/login")
                    }}
                    className={"w-25"}>Login</button>
                    <button onClick={(event) =>{
                        event.preventDefault()
                        navigate("/register")
                    }}
                    className={"w-25"}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Workplace