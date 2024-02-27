import Post from "../modals/post.modal.js";
import { handelError } from "../utils/handelError.js";

export const createPost = async (req, res, next) => {
  const { slug, postId, content, title, featuredImage, category, tags } =
    req.body;
  if (!req.user.onBoardingComplete) {
    return next(handelError(403, "Onboarding Error"));
  }

  try {

    if (!postId || !req.user.id || !content || !slug || !title) {
      return next(handelError(400, "All fields are required"));
    }


    
    //check if new or draft

    const checkPost = await Post.findOne({ postId });
    // if draft
    if (checkPost) {
      const checkSlug = await Post.findOne({ slug, userId: req.user.id });
      if(checkSlug){
        if(checkSlug.postId===postId){
          const updatePost = await Post.findByIdAndUpdate(
            checkPost._id,
            { published: true, slug, postId, content, title, featuredImage, category, tags},
            { new: true }
          );
          return res.status(200).json(updatePost);

        }
        else{
          return next(handelError(403, "Slug is not available"));
  
        }
        

      }
     
      
      const updatePost = await Post.findByIdAndUpdate(
        checkPost._id,
        { published: true, slug, postId, content, title, featuredImage, category, tags},
        { new: true }
      );
      return res.status(200).json(updatePost);
    }

    //new post

    //check Slug

    

    //create post

    const checkSlug = await Post.findOne({ slug, userId: req.user.id });

    if (checkSlug) {
      return next(handelError(403, "Slug is not available"));
    }

    const createPost = new Post({
      postId,
      userId: req.user.id,
      content,
      slug,
      title,
      featuredImage,
      category,
      tags,
    });
    await createPost.save();
    return res.status(200).json(createPost);
  } catch (e) {
    next(e);
  }
};

export const CreateDraft = async (req, res, next) => {
  const { slug, postId, content, title, featuredImage, category, tags } =
    req.body;
  if (!req.user.onBoardingComplete) {
    return next(handelError(403, "Onboarding Error"));
  }

  //if new draft or old draft

  try {
    const findDraft = await Post.findOne({ postId });
    if (findDraft) {
      const updatedPost = await Post.findByIdAndUpdate(
        findDraft._id,
        { published: false },
        { new: true }
      );
      return res.status(200).json(updatedPost);
    }

    // if new draft

  

    const createPost = new Post({
      postId,
      userId: req.user.id,
      content,
      slug,
      title,
      featuredImage,
      category,
      tags,
      published: false,
    });
    await createPost.save();
    return res.status(200).json(createPost);
  } catch (e) {
    next(e);
  }
};
