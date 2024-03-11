

import express from 'express'
import { create,getProfile,getMyProfile,addbookmark,getMyAbout,updateAbout,updateProfile, getMybookmakrs,follow,removefollow, randomProfiles } from '../controllers/profile.controller.js'
import { verifyToken } from '../utils/verifyToken.js'
import { handelError } from '../utils/handelError.js'

import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/create' , (req,res,next) =>{
    const token = req.cookies.access_token
    if(!token){
        return next(handelError(401, "UnAuthorized"))
    }


    jwt.verify(token, process.env.JWT_SECRET , (err,user) =>{
        if(err){
            console.log(err)
            return next(handelError(401, "UnAuthorized"))

        }



        req.user = user
        next()
       
    })


} ,create)


router.get('/get/:userId', getProfile )
router.get('/myprofile/:username',  getMyProfile )
router.get('/mybookmarks',verifyToken,  getMybookmakrs )

router.get('/about/:username', getMyAbout )
router.get('/addbookmark/:postId',verifyToken, addbookmark )
router.post('/updateAbout/',verifyToken, updateAbout )
router.post('/update/',verifyToken, updateProfile )
router.get('/follow/:authorId',verifyToken, follow )
router.get('/removefollow/:authorId',verifyToken, removefollow )
router.get('/randomprofiles', randomProfiles)

export default router