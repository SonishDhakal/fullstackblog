import express from "express";
import { addComments, getCommets,likeComments } from "../controllers/coment.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.get('/getcomments/:postId', getCommets);
router.post('/addcomment',verifyToken, addComments)
router.get('/like/:commentId',verifyToken, likeComments)


export default router