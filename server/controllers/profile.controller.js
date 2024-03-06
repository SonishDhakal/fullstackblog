import User from "../modals/user.modal.js";
import { handelError } from "../utils/handelError.js"
import Profile from "../../client/src/redux/user/profile.modal.js";
import jwt from 'jsonwebtoken'

export const create = async (req,res,next) =>{

    const { onBoardingComplete,emailVerified} = req.user


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

        const newObject = {...rest, profilePicture:newProfile.profilePicture}

        const token = jwt.sign(
            {
                id:updatedUser._id,
                emailVerified: updatedUser.emailVerified,
                onBoardingComplete:updatedUser.onBoardingComplete

            },
            process.env.JWT_SECRET
        )

        res.cookie('access_token', token, {httpOnly:true}).status(200).json(newObject)


    }
    catch(e){
        next(e)
    }

}

export const getProfile = async (req,res,next) =>{
    const {userId} = req.params;

    try{

        const findProfile =await Profile.findOne({userId})
        if(!findProfile){
            next(handelError(404, "Profile Not found"))
        }
        else{
            const {profilePicture,firstName,lastName} = findProfile; 
            res.status(200).json({profilePicture,firstName,lastName})
        }


    }
    catch(e){
        next(e)
    }
}
export const getMyProfile = async (req,res,next) =>{
const {username} = req.params;

    try{
        
        const getUser  = await User.findOne({username})
        if(!getUser){
          return  next(handelError(404, "Profile Not found"))
        }
        const findProfile =await Profile.findOne({userId:getUser._id})
        if(!findProfile){
           return next(handelError(404, "Profile Not found"))
        }
        else{

            if(findProfile.userId ===req?.user?.id){
              return  res.status(200).json(findProfile)
            }
            else{
                const {bookmarks,...rest} = findProfile._doc
              return res.status(200).json(rest)
            }

            
        }


    }
    catch(e){
        next(e)
    }
}

export const addbookmark = async (req,res,next) =>{
    const {id} = req.user
    const {postId} = req.params;
    try{

        const getProfile = await Profile.findOne({userId:id});
    
    
        const bookmarks = getProfile.bookmarks

    
        const hasbookmarked = bookmarks.includes(postId);

    
    
        if(!hasbookmarked){

          const updatesBookmark = [...bookmarks, postId]
          console.log(updatesBookmark)

          const updatePost = await Profile.findByIdAndUpdate(getProfile._id, {bookmarks:updatesBookmark}, {new:true})
          const {following,bookmarks:book} = updatePost; 
          return res.status(200).json({following,bookmarks:book})
        }
        else{
          const updatesBookmark = bookmarks.filter(item => item !==postId)
          const updatePost = await Profile.findByIdAndUpdate(getProfile._id, {bookmarks:updatesBookmark}, {new:true})
          const {following,bookmarks:book} = updatePost; 
          return res.status(200).json({following,bookmarks:book})
    
        }
    
        
    
      }
      catch(e){
        next(e)
      }
    
}



export const getMyAbout = async (req,res,next) =>{
    const {username} = req.params;

    try{
        const findProfile = await Profile.findOne({userId:username});
        if(!findProfile){
            return next(handelError(404, "Profile Not found"))
        }

        const {socials,about} = findProfile._doc 
        res.status(200).json({socials,about})



    }
    catch(e){
        next(e)
    }
}


export const updateAbout = async (req,res,next) =>{
    const {about,socials} = req.body;

    try{
        const updateProfile = await Profile.findOneAndUpdate({userId:req.user.id},{about,socials},{new:true});
        res.status(200).json('done')

    }
    catch(e){
        next(e)
    }
}


export const updateProfile = async (req,res,next) =>{
    const {firstName,lastName,gender,bio,profilePicture} = req.body;
    try{
        const findProfile = await Profile.findOneAndUpdate({userId:req.user.id}, {firstName,lastName,gender,bio,profilePicture}, {new:true});

        res.status(200).json('done')

    }
    catch(e){
        next(e)
    }
}

export const  getMybookmakrs = async (req,res,next) =>{
    try{
        const findPost = await Profile.findOne({userId:req.user.id})


        res.status(200).json(findPost)

    }
    catch(e){

    }
}