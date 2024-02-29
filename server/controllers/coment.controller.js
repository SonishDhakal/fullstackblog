
import Comment from "../modals/comment.modal.js";
import { handelError } from "../utils/handelError.js";


export const getCommets = async (req,res,next) =>{
    const {postId} = req.params;

    try{

        const findComment = await Comment.find({postId}).sort({updatedAt:-1});
        if(!findComment){
            return res.status(204).json({message: 'No Comments'})
        }
        return res.status(200).json(findComment)


    }
    catch(e){
        next(e)

    }
}


export const addComments = async (req,res,next) =>{
    const { postId, content} = req.body;
    const {id:userId} = req.user;


   try{
    if(!userId || !postId || !content){
        return  next(handelError(400, "All fields are required"));
  
      }
  
  
      const comment = new Comment({userId,postId,content});
  
      await comment.save();
      res.status(200).json(comment)
   }
   catch(e){
    next(e)
   }
}

export const likeComments = async (req,res,next) =>{
    const {id} = req.user
    const {commentId} = req.params;
  
  
    try{
  
      const getCommets = await Comment.findById(commentId);
  
  
      const likeUser = getCommets.likes;
  
      const hasLiked = likeUser.includes(id);
  
  
      if(!hasLiked){
        const updatesLikes = [...likeUser, id]
        const updateComment = await Comment.findByIdAndUpdate(commentId, {likes:updatesLikes}, {new:true})
        return res.status(200).json(updateComment)
      }
      else{
        const updatesLikes = likeUser.filter(item => item !==id)
        const updateComment = await Comment.findByIdAndUpdate(commentId, {likes:updatesLikes}, {new:true})
        return res.status(200).json(updateComment)
  
      }
  
      
  
    }
    catch(e){
      next(e)
    }
  
  
  }

  export const deleteComments = async (req,res,next) =>{
    const {commentId} = req.params

    try{
      const findComent = await Comment.findById(commentId);

      if(findComent.userId === req.user.id){
        await Comment.findByIdAndDelete(commentId)
        res.status(200).json({message:'Comment Deleted'})
      }
      else{
        next(handelError(401, 'UnAuthorized'))
      }

      
    }
    catch(e)
{
  next(e)
}    
  }