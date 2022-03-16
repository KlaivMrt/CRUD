import React, { useState } from "react";

interface IBody{
    UserPassword: string;
    Email: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPasswor] = useState<string>("");

    const signIn = async () => {
        const Body: IBody = {
            UserPassword: password,
            Email: email
        }

        const responce = await fetch("http://localhost:5000/api/user/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(Body)
        });

        const user = await responce.json();
        console.log(user);
    }

    return(
        <div>
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