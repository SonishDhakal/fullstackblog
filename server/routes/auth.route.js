import express from 'express'
import { singup } from '../controllers/auth.controller.js';
import { sendVerificationCode } from '../controllers/verify.controller.js';

const router = express.Router();



router.post('/sign-up', singup)
router.post('/sign-in', sendVerificationCode)

export default router