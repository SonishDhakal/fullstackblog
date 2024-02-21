import express from 'express'
import { singup,signin, oAuth,signout } from '../controllers/auth.controller.js';


const router = express.Router();



router.post('/sign-up', singup)
router.post('/sign-in', signin)
router.post('/oauth', oAuth)
router.get('/signout', signout)

export default router