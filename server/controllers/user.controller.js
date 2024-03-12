import Profile from "../../client/src/redux/user/profile.modal.js";
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
        const updaePass = await User.findOneAndUpdate({email:req.body.email}, {password:hashedPassword})
        res.status(200).json('Success');

    }
    catch(e){
        next(e)
    }
}

export const forgotEmail = async (req,res,next) =>{
    try{
        if(!req.body.email){
            return next(handelError(401, "UnAuthorized"))
        }
        const searchEmail = await User.findOne({email:req.body.email})
        if(searchEmail){
            return next(handelError(402, "Email already in Use"))
        }

        await User.findByIdAndUpdate(req.user.id,{email:req.body.email});
        res.status(200).json('Done')

    }
    catch(e){
        next(e)
    }


}


export const checkEmail = async (req,res,next) =>{
    const searchEmail = await User.findOne({email:req.body.email})
    if(searchEmail){
        return next(handelError(402, "Email already in Use"))
    }
    else{
        return res.status(200).json('nice')
    }

}


export const getUsername = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.userId)
        const {username} = user._doc
        res.status(200).json({username})

    }
    catch(e){
        next(e)
    }
}

export const getUserProfile = async (req,res,next) =>{
    try{
        const finduser = await User.findById(req.params.userId)
        const findProfile = await Profile.findOne({userId:req.params.userId})


        const {username,_id} = finduser._doc
        const {firstName,lastName,profilePicture} = findProfile._doc

        res.status(200).json({username,firstName,lastName,profilePicture,_id})


    }
    catch(e){
        next(e)
    }
}