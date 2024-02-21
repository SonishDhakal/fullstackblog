import express from 'express'
import { singup,signin, oAuth } from '../controllers/auth.controller.js';


const router = express.Router();



router.post('/sign-up', singup)
router.post('/sign-in', signin)
router.post('/oauth', oAuth)

export default router