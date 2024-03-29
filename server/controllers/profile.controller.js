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
            const fetchUser = await User.findById(findProfile.userId)
            const {username} = fetchUser._doc;
            const {profilePicture,firstName,lastName,bio} = findProfile._doc; 
            res.status(200).json({profilePicture,firstName,lastName,username,bio})
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


export const follow = async (req,res,next) =>{
    const {authorId} = req.params;
    const userId = req.user.id;

    try{


        const userProfile = await Profile.findOne({userId})
        const authorProfile = await Profile.findOne({userId:authorId})


        if(!userProfile){
            next(handelError(404, 'Profile Not found'))
        }

        const {following:userFollowing} = userProfile._doc;
        const {followers:authorFollowers} = authorProfile._doc;


        ///check if follow or unfollow //

        const exists = userFollowing.includes(authorId);

        if(exists){
            // unfollow

            const newUserFollowing = userFollowing.filter(item => item!==authorId)

            //remove from the followers of author as well
            const newAuthorFollowers = authorFollowers.filter(item => item!==userId)

            //save both
         const userProfiles=  await Profile.findOneAndUpdate({userId},{following:newUserFollowing},{new:true})
            const authorProfiles = await Profile.findOneAndUpdate({userId:authorId},{followers:newAuthorFollowers},{new:true})

            res.status(200).json({authorProfiles,userProfiles})




        }
        else{
            
            userFollowing.push(authorId)
            authorFollowers.push(userId)

            const userProfiles= await Profile.findOneAndUpdate({userId},{following:userFollowing},{new:true})
            const authorProfiles=  await Profile.findOneAndUpdate({userId:authorId},{followers:authorFollowers},{new:true})

            res.status(200).json({authorProfiles,userProfiles})




            //follow
        }
        

    }
    catch(e){
        next(e)
    }
}


export const removefollow = async (req,res,next) =>{
    const {authorId} = req.params;
    const userId = req.user.id;
    try{
        const userProfile = await Profile.findOne({userId})
        const authorProfile = await Profile.findOne({userId:authorId})


        const {followers:userFollowers} = userProfile._doc;
        const {following:authorFollowing} = authorProfile._doc;


        const newUserFollowers = userFollowers.filter(item => item!==authorId)
        const newAuthorFollowing =authorFollowing.filter(item => item!==userId)

        const userProfiles=  await Profile.findOneAndUpdate({userId},{followers:newUserFollowers},{new:true})
        const authorProfiles = await Profile.findOneAndUpdate({userId:authorId},{following:newAuthorFollowing},{new:true})

        res.status(200).json({authorProfiles,userProfiles})



    }
    catch(e){
        next(e)
    }

}


export const randomProfiles =  async (req,res,next) => {
    try
    {
        const randomProfile = await Profile.aggregate([
            {$sample: {size:5}},
            {$project:{
                profilePicture:1,
                lastName:1,
                firstName:1,
                userId:1,
                bio:1,
                _id:0
            }}
          ])
          res.status(200).json(randomProfile)

        

      

    }
    catch(e){
        next(e)
    }
}


export const searchProfile = async (req,res,next) =>{
    try{
        const Profilequery = {
        
            ...(req.query.search && {
              $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { lastName: { $regex: req.query.search, $options: "i" } },
                { bio: { $regex: req.query.search, $options: "i" } },
              ],
            }),
          };

          const userQuery =  {
            ...(req.query.search && {
                $or: [
                  { username: { $regex: req.query.search, $options: "i" } },
                  
                ],
              }),

          }


          let allProfiles = await Profile.find(Profilequery,{userId:1, _id:0});
          let allUsers = await User.find(userQuery,{_id:1} )


          const newProfiles = allProfiles.map(item => item.userId)
          const newUsers = allUsers.map(item => item._id.toString())

          let all = [...newProfiles,...newUsers]
          let uniqueA =  [...new Set(all)];

          




          res.status(200).json(uniqueA)
        

        

    }
    catch(e){
        next(e)
    }
}