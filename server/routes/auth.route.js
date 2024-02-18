import express from 'express'
import { singup } from '../controllers/auth.controller.js';

const router = express.Router();



router.post('/sign-up', singup)

export default router