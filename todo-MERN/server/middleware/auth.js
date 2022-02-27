import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const auth = (req, res, next) => {
    const token = req.header("x-auth-token")

    if (!token) return res.status(401).json({message: "No token, authorization denied."})

    try{
        req.user = jwt.verify(token, process.env.JWT_KEY)
        next()
    }catch (e) {
        res.status(400).json({message: "Token not valid."})
    }
}