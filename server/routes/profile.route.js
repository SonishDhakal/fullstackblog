

import express from 'express'
import { create } from '../controllers/profile.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.post('/create' , verifyToken ,create)

export default router