import express from 'express'
import { sendVerificationCode } from '../controllers/verify.controller.js'

const router = express.Router()

router.post('/send', sendVerificationCode)


export default router;
