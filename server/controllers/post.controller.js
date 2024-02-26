import Post from "../modals/post.modal";
import { handelError } from "../utils/handelError";

export const createPost = async (req, res, next) => {
  const { slug, postId, content, title, featuredImage, category, tags } =
    req.body;
  if (!req.user.onBoardingComplete) {
    return next(handelError(403, "Onboarding Error"));
  }

  try {
    //check if new or draft

    const checkPost = await Post.findOne({ postId });
    // if draft
    if (checkPost) {
      const updatePost = await Post.findByIdAndUpdate(
        checkPost._id,
        { published: true },
        { new: true }
      );
      return res.status(200).json(updatePost);
    }

    //new post

    //check Slug

    const checkSlug = await Post.findOne({ slug: slug });
    if (checkSlug) {
      return next(handelError(400, "Slug is not available"));
    }

    //create post

    if (!postId || !req.user.id || !content || !slug || !title) {
      return next(handelError(400, "All fields are required"));
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

    if (!postId || !req.user.id || !content || !slug || !title) {
      return next(handelError(400, "All fields are required"));
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
      published: false,
    });
    await createPost.save();
    return res.status(200).json(createPost);
  } catch (e) {
    next(e);
  }
};
