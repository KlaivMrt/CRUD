import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../Context/ContextProvider";

const Register = () => {
    const navigate = useNavigate()
    const {state, setState} = useContext(Context)
    const [user, setUser] = useState({
        username: "",
        password: "",
        passwordRepeat: "",
        email: ""
    })

    const onChange = (event) => {
      event.preventDefault()
        setUser({...user, [event.target.name]: event.target.value})
    }

    const registerUser = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:5000/credentials/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify(user)
        })

        const data = await response.json()

        if (data.token){
            setState({
                token: data.token,
                username: data.username,
                userId: data.userId
            })
            navigate("/home/active")
        }else{
            alert("Invalid credentials")
        }

        // if (data.status === "ok"){
        //     window.location.href = "/login"
        // }
    }

  return(
      <div id={"register-container"} className={"container h-100"}>
          <div className={"row h-25 align-items-end"}>
              <h1 className={"row justify-content-center align-items-center h-50 bg-light"}>Register</h1>
          </div>

          <form className={"row h-75"}>

              <div className={"col"}>

                  <div className={"row my-1"}>
                      <label htmlFor="username" className={"col-5 text-end offset-3 my-0 mx-2 h4"}>Username: </label>
                      <input type="text" name={"username"} onChange={onChange} className={"col-4"}/>
                  </div>

                  <div className={"row mb-1"}>
                      <label htmlFor="password" className={"col-5 text-end offset-3 my-0 mx-2 h4"}>Password: </label>
                      <input type="password" name={"password"} onChange={onChange} className={"col-4"}/>
                  </div>

                  <div className={"row mb-1"}>
                      <label htmlFor="passwordRepeat" className={"col-5 text-end offset-3 my-0 mx-2 h4"}>Repeat Password: </label>
                      <input type="password" name={"passwordRepeat"} onChange={onChange} className={"col-4"}/>
                  </div>

                  <div className={"row mb-4"}>
                      <label htmlFor="email" className={"col-5 text-end offset-3 my-0 mx-2 h4"}>Email: </label>
                      <input type="email" name={"email"} onChange={onChange} className={"col-4"}/>
                  </div>

                  <div className={"d-flex flex-row justify-content-center"}>
                      <button type={"submit"} onClick={registerUser} className={"h4"}>Submit</button>
                  </div>
                </div>
          </form>
      </div>
  )
}

export default Register