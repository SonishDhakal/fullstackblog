
import Post from "../modals/post.modal"
import { handelError } from "../utils/handelError"

export const createPost = async (req,res,next) =>{
    const {slug} = req.body
    if(!req.user.onBoardingComplete){
        return next(handelError(403,'Onboarding Error'))
    };

    try{

        //check Slug

        const checkSlug = Post.findOne({slug:slug})
        if(checkSlug){
            return next(handelError(400,'Slug is not available'))


        }

        //create post

        const createPost  = new Post({
            userId,
            content,
            slug,
            title,
            featuredImage,
            category,
            tags,

        })

        

    }
    catch(e){
        next(e)
    }


}