import express from "express";
import { updateUsername } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.post('/updateUsername',verifyToken, updateUsername)


export default router