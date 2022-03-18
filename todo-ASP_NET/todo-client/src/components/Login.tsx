import React, { useState } from "react";
import {setUser} from "../context/user";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
//import {RootState} from "../store/store"


interface IBody{
    UserPassword: string;
    Email: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPasswor] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //const context = useSelector((state: RootState) => state.userReducer.value);


    const signIn = async () => {
        const Body: IBody = {
            UserPassword: password,
            Email: email
        }

        const responce = await fetch("http://localhost:5000/api/user/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Body)
        });

        const user = await responce.json();
        //console.log(user);
        dispatch(setUser(user));
    
        // console.log(context);
        navigate("/home/active")
    }

    return(
        <div id="login">
            <form>
            <input placeholder={"Email"}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter"){
                    signIn()
                }
            }}
            />


            <input type={"password"} placeholder={"Password"} 
            onChange={(e) =>{
                setPasswor(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter"){
                    signIn()
                }
            }}
            />
            </form>
        </div>
    );
}

export default Login;