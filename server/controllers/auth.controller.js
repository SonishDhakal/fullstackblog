import { handelError } from "../utils/handelError.js";
import User from '../modals/user.modal.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const singup =async (req,res,next) =>{

    const {username,password,email} = req.body;

    if(!username || !password ||!email){
        return next(handelError(401, "All the fields are required"))
    }

    try{

        const checkUser =await User.findOne({username})
        if(checkUser){
            return next(handelError(400, 'Username not available'))
        }

        const checkEmail = await User.findOne({email})

        if(checkEmail){
            return next(handelError(400, 'Email not available'))
        }

        const hashedPassword = bcryptjs.hashSync(password,10)


        const newUser = User({username,password:hashedPassword, email})

        await newUser.save()

        res.status(200).json(newUser._id)

    }
    catch(e){
        next(e)
    }



}


export const signin = async (req,res,next) =>{

    const {value,password} = req.body;

    if(!value||!password){
        return next(handelError(401, "All the fields are required"))
    }


    const findUserbyUsername = await User.findOne({username:value})

    if(!findUserbyUsername){
        const findUserbyemail = await User.findOne({email:value})
        if(!findUserbyemail){
            return next(handelError(401, "Incorrect Credentials: No account with such Email or Username"))
        }

        const checkpassword = bcryptjs.compareSync(password,findUserbyemail.password)

        if(!checkpassword){
            return next(handelError(401, "Incorrect password"))
        }

        const {password: pass, ...rest} = findUserbyemail._doc

        if(!findUserbyemail.emailVerified){
           return res.status(200).json({unverified:true, userId:findUserbyemail._id,email:findUserbyemail.email})
        }
        else{

            const token = jwt.sign(
                {
                    id:findUserbyemail._id,
                    emailVerified: findUserbyemail.emailVerified,
                    onBoardingComplete:findUserbyemail.onBoardingComplete

                },
                process.env.JWT_SECRET
            )

            
             

            
            



          return res.status(200).cookie('access_token', token ,{httpOnly:true}).json(rest)

        }



    }
    else{
        const checkpassword = bcryptjs.compareSync(password,findUserbyUsername.password)

        if(!checkpassword){
            return next(handelError(401, "Incorrect password"))
        }

        const {password: pass, ...rest} = findUserbyUsername._doc

        if(!findUserbyUsername.emailVerified){
            return res.status(200).json({unverified:true, userId:findUserbyUsername._id, email:findUserbyUsername.email})
         }
         else{
 
             const token = jwt.sign(
                 {
                     id:findUserbyUsername._id,
                     emailVerified: findUserbyUsername.emailVerified,
                     onBoardingComplete:findUserbyUsername.onBoardingComplete
 
                 },
                 process.env.JWT_SECRET
             )
 
             
              
 
             
             
 
 
 
           return res.status(200).cookie('access_token', token ,{httpOnly:true}).json(rest)
 
         }


    }


}
