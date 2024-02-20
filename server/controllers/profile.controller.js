import User from "../modals/user.modal.js";
import { handelError } from "../utils/handelError.js"
import Profile from "../../client/src/redux/user/profile.modal.js";


export const create = async (req,res,next) =>{

    const { onBoardingComplete,emailVerified} = req.user
    console.log(onBoardingComplete,emailVerified)

    if(onBoardingComplete || !emailVerified){
        return next(handelError(401, "UnAuthorized"))
    }

    const {userId} = req.body;


    try{
        const user = await User.findById(userId)

        if(!user){
            return next(handelError(401, "UnAuthorized"))
        }

        const newProfile = new Profile(req.body)
        await newProfile.save()

        const updatedUser = await User.findByIdAndUpdate(userId, {onBoardingComplete:true} ,{new:true})

        const {password, ...rest} = updatedUser._doc;

        const newObject = {...rest, profilePicture:newProfile.profilePicture, theme:newProfile.theme}

        const token = jwt.sign(
            {
                id:findUserbyemail._id,
                emailVerified: findUserbyemail.emailVerified,
                onBoardingComplete:findUserbyemail.onBoardingComplete

            },
            process.env.JWT_SECRET
        )

        res.cookie('access_token', token, {httpOnly:true}).status(200).json(newObject)


    }
    catch(e){
        next(e)
    }

}