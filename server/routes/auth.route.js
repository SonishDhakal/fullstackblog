import express from 'express'
import { singup,signin } from '../controllers/auth.controller.js';


const router = express.Router();



router.post('/sign-up', singup)
router.post('/sign-in', signin)

export default router