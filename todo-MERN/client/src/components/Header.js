import {useNavigate} from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate()

    return(
        <header className={"d-flex justify-content-between align-items-center px-5 py-2 border-bottom w-100"}>
            <h1>{props.title}</h1>

            <div id={"icons"} className={"d-flex flex-row justify-content-around align-items-center w-25"}>
                <i id={"house"} className={"bi bi-house h4 my-0"} onClick={() => navigate("/home/active")}>
                </i>
                <i id={"completed"} className={"bi bi-check2-square h4 my-0"} onClick={() => navigate("/home/completed")}>
                </i>
                <h3>{props.username}</h3>
            </div>
        </header>
    )
}

export default Header