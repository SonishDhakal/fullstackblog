import { handelError } from "../utils/handelError.js";
import User from '../modals/user.modal.js'
import bcryptjs from 'bcryptjs'

export const singup =async (req,res,next) =>{

    const {username,password,email} = req.body;

    if(!username || !password ||!email){
        return next(handelError(401, "All the fields are required"))
    }

    try{

        const checkUser =await User.findOne({username})
        if(checkUser){
            return next(handelError(400, 'Username not available'))
        }

        const checkEmail = await User.findOne({email})

        if(checkEmail){
            return next(handelError(400, 'Email not available'))
        }

        const hashedPassword = bcryptjs.hashSync(password,10)


        const newUser = User({username,password:hashedPassword, email})

        await newUser.save()

        res.status(200).json(newUser._id)

    }
    catch(e){
        next(e)
    }



}

