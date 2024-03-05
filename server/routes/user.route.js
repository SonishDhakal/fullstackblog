import express from "express";
import { forgotPassword, updatePassword, updateUsername } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.post('/updateUsername',verifyToken, updateUsername)
router.post('/updatePassword',verifyToken, updatePassword)
router.post('/forgotPassword',verifyToken, forgotPassword)


export default router