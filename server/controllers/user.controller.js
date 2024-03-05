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