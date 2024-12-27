import jwt from "jsonwebtoken"
import { createError } from "./error.js"

// used to verify the login before do update or delete user details
export const verifyToken = (req, res, next) =>{
    console.log(req);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
    console.log("Authorization Header:", authHeader);
    console.log(token)
    if(!token){
        return res.status(200).json("You are not authorized!")
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        console.log(user);
        if(err) return res.status(200).json("Token is not valid!")
        req.user = user;
        next()
    })
}