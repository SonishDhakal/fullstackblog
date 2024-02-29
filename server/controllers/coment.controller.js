
import Comment from "../modals/comment.modal.js";
import { handelError } from "../utils/handelError.js";


export const getCommets = async (req,res,next) =>{
    const {postId} = req.params;

    try{

        const findComment = await Comment.find({postId});
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