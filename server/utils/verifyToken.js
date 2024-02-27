import { handelError } from "./handelError.js"
import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next) =>{

    const token = req.cookies.access_token
    if(!token){
        return next(handelError(401, "UnAuthorized"))
    }


    jwt.verify(token, process.env.JWT_SECRET , (err,user) =>{
        if(err){

            return next(handelError(401, "UnAuthorized"))

        }

        if(!user.onBoardingComplete){
            return next(handelError(405, "Please Complete the onboarding process"))
        }



        req.user = user
        next()
       
    })

    


}