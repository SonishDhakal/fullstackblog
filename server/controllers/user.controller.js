import User from "../modals/user.modal.js";
import { handelError } from "../utils/handelError.js";
import bcryptjs from "bcryptjs";

export const updateUsername = async (req,res,next) =>{
    const {username,password} = req.body;

    try{

        const isUser = await User.findOne({username})
        if(isUser){
            return next(handelError(404, "Username not available"))

        }



        const findUser =await User.findById(req.user.id)
        if(!findUser){
            return next(handelError(404, "User not Found"))


        }

        const checkpassword = bcryptjs.compareSync(
            password,
            findUser.password
          );


        if(!checkpassword){
            return next(handelError(401, "Incorrect password"))
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {username},{new:true})

        const {username:user} = updatedUser._doc

        res.status(200).json({username:user})



        

    }
    catch(e){
        next(e)
    }

}


export const updatePassword = async (req,res,next) =>{
    const {newPassword, currentPassword} = req.body;

    if(!newPassword || !currentPassword){
        return next(handelError(401, 'Unauthorized'))
    }

    try{
        const getUser = await User.findById(req.user.id);

        const checkpassword = bcryptjs.compareSync(currentPassword,getUser.password);

        if(!checkpassword){
            return next(handelError(401, "Incorrect password"))

        }

        const hashedPassword = bcryptjs.hashSync(newPassword, 10);


        await User.findByIdAndUpdate(req.user.id, {password:hashedPassword})

        res.status(200).json('Done')
   
    }
    catch(e){
        next(e)
    }
}


export const forgotPassword = async (req,res,next) =>{
    try{
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        const updaePass = await User.findByIdAndUpdate(req.user.id, {password:hashedPassword})
        res.status(200).json('Success');

    }
    catch(e){
        next(e)
    }
}