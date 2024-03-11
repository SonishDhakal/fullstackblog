import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { CreateDraft, createPost,getPost,like,popularPosts,tags } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost)
router.post('/draft', verifyToken, CreateDraft)
router.get('/getposts', getPost)
router.get('/like/:postId',verifyToken, like)
router.get('/popularPosts', popularPosts)
router.get('/tags', tags)

export default router