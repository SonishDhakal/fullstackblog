import express from "express";
import { updatePassword, updateUsername } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.post('/updateUsername',verifyToken, updateUsername)
router.post('/updatePassword',verifyToken, updatePassword)


export default router