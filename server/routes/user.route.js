import express from "express";
import { forgotPassword, updatePassword, updateUsername,forgotEmail,checkEmail,getUsername } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.post('/updateUsername',verifyToken, updateUsername)
router.post('/updatePassword',verifyToken, updatePassword)
router.post('/forgotPassword',verifyToken, forgotPassword)
router.post('/updateEmail',verifyToken, forgotEmail)
router.post('/checkEmail',verifyToken, checkEmail)
router.get('/getUsername/:userId', getUsername)


export default router