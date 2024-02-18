import express from 'express'
import { sendVerificationCode, verifyCode } from '../controllers/verify.controller.js'

const router = express.Router()

router.post('/send', sendVerificationCode)
router.post('/check', verifyCode)


export default router;
