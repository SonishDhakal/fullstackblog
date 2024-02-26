import express from 'express'
import { verifyToken } from '../utils/verifyToken';
import { createPost } from '../controllers/post.controller';

const router = express.Router();

router.post('/create', verifyToken, createPost)