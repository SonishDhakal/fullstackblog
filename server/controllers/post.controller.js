import Post from "../modals/post.modal.js";
import { handelError } from "../utils/handelError.js";

export const createPost = async (req, res, next) => {
  const { slug, postId, content, title, featuredImage, category, tags,username } =
    req.body;


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
      username
    });
    await createPost.save();
    return res.status(200).json(createPost);
  } catch (e) {
    next(e);
  }
};

export const CreateDraft = async (req, res, next) => {
  const { slug, postId, content, title, featuredImage, category, tags,username } =
    req.body;


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
      username

    });
    await createPost.save();
    return res.status(200).json(createPost);
  } catch (e) {
    next(e);
  }
};


export const getPost = async (req,res,next) =>{
  try{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {category:req.query.category}),
      ...(req.query.slug && {slug:req.query.slug}),
      ...(req.query.postId && {postId:req.query.postId}),
      ...(req.query.published && {published:req.query.published}),
      ...(req.query.searchTerm && {
        $or:[
          {title:{$regex: req.query.searchTerm, $options:"i"}},
          {tags:{$regex: req.query.searchTerm, $options:"i"}},
          {content:{$regex: req.query.searchTerm, $options:"i"}},
        ]
      })



    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)

    if(posts){
      res.status(200).json(posts)

    }
    else{
      next(handelError(404, "No posts found"))
    }

  }

  
  catch(e){
    next(e)
  }



}

export const like = async (req,res,next) =>{
  const {id} = req.user
  const {postId} = req.params;


  try{

    const getPost = await Post.findOne({postId});


    const likeUser = getPost.likes;

    const hasLiked = likeUser.includes(id);


    if(!hasLiked){
      const updatesLikes = [...likeUser, id]
      const updatePost = await Post.findByIdAndUpdate(getPost._id, {likes:updatesLikes}, {new:true})
      return res.status(200).json(updatePost)
    }
    else{
      const updatesLikes = likeUser.filter(item => item !==id)
      const updatePost = await Post.findByIdAndUpdate(getPost._id, {likes:updatesLikes}, {new:true})
      return res.status(200).json(updatePost)

    }

    

  }
  catch(e){
    next(e)
  }


}


