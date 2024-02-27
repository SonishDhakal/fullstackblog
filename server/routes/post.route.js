import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { CreateDraft, createPost,getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost)
router.post('/draft', verifyToken, CreateDraft)
router.get('/getposts', getPost)

export default router