import { handelError } from "./handelError.js"
import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next) =>{

    const token = req.cookies.access_token
    if(!token){
        return next(handelError(401, "UnAuthorized"))
    }


    jwt.verify(token, process.env.JWT_SECRET , (err,user) =>{
        if(err){
            console.log(err)
            return next(handelError(401, "UnAuthorized"))

        }



        req.user = user
        next()
       
    })

    


}