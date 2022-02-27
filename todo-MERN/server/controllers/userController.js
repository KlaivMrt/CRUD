import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// UserModel credentials
export const userRegister = async (req, res) => {
    try{
        let {username, email, password, passwordRepeat} = req.body

        // Validations
        if(!email || !password || !passwordRepeat){
            return res.status(400).json({message: "Mandatory fields are missing."})
        }
        if (username.length < 6){
            return res.status(400).json({message: "Username must be at least 6 characters long."})
        }
        if (password.length < 5){
            return res.status(400).json({message: "Password needs to be at least 5 characters."})
        }
        if (password !== passwordRepeat){
            return res.status(400).json({message: "Passwords not matching."})
        }
        // check if email already exists
        const emailExists = await UserModel.findOne({email: email})
        if (emailExists){
            return res.status(400).json({message: "Email already used."})
        }

        if(!username){
            username = email
        }
        const salt = await bcrypt.genSalt()

        let passwordHashed = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            username: username,
            email:email,
            password: passwordHashed,
        })

        await newUser.save()
        jwt.sign(
            {id: newUser._id},
            process.env.JWT_KEY,
            (err, token) => {
                if (err) throw err
                res.json({
                    token,
                    username: newUser.username,
                    userId: newUser._id
                })
            })
    }catch (err){
        console.error(err.message)
        return res.status(500).json({error: err.message})
    }
}

export const userLogin = async (req, res) =>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message: "Mandatory fields are missing."})
        }

        const user = await UserModel.findOne({email: email})
        if (!user){
            return res.status(400).json({message: "UserModel not found"})
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch){
            return res.status(400).json({message: "Passwords don't match."})
        }

        //Users ok, generate JWT (json Web Token)
        jwt.sign(
            {id: user._id},
            process.env.JWT_KEY,
            (err, token) => {
            if (err) throw err
                res.json({
                    token,
                    username: user.username,
                    userId: user._id
                })
            })


    }catch (err){
        return res.status(400).json({error: err.message})
    }
}

