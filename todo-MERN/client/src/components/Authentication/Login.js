import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../Context/ContextProvider";

const Login = () => {
    const navigate = useNavigate()
    const {state, setState} = useContext(Context)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    // const history = useHistory()

    const onChange = (event) => {
        event.preventDefault()
        setUser({...user, [event.target.name]: event.target.value})
        // console.log(event.target.value)
    }

    const userLogin = async (event) =>{
        event.preventDefault()
        const response = await fetch("http://localhost:5000/credentials/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()

        if(data.token){
            setState({
                token: data.token,
                username: data.username,
                userId: data.userId
            })
            navigate("/home/active")
        }else {
            alert("Invalid credentials.")
        }

    }


    return(
        <div id={"login-container"} className={"container h-100"}>
            <div className={"row h-50 align-items-end"}>
                <h1 className={"row justify-content-center align-content-center text-center h-25 bg-light"}>Login</h1>
            </div>
            <form className={"h-50 row"}>

                <div className={"col align-self-start"}>
                    <div className={"mb-2 row"}>
                        <label htmlFor="email" className={"col-5 offset-3 text-end h4 my-0 mx-2"} >Email: </label>
                        <input type="email" name={"email"} onChange={onChange} className={"col-4"}/>
                    </div>

                    <div className={"mb-4 row"}>
                        <label htmlFor="password" className={"col-5 offset-3 text-end h4 my-0 mx-2"}>Password: </label>
                        <input type="password" name={"password"} onChange={onChange} className={"col-4"}/>
                    </div>


                    <div className={"d-flex flex-row justify-content-center"}>
                        <button type={"submit"} onClick={userLogin}>Login</button>
                    </div>

                </div>

            </form>
        </div>
    )
}

export default Login