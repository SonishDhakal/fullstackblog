import express from "express";
import { addComments, getCommets,likeComments,deleteComments} from "../controllers/coment.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.get('/getcomments/:postId', getCommets);
router.post('/addcomment',verifyToken, addComments)
router.get('/like/:commentId',verifyToken, likeComments)
router.delete('/delete/:commentId',verifyToken, deleteComments)


export default router