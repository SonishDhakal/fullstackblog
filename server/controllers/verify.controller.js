import nodemailer from 'nodemailer'
import {randomBytes} from 'node:crypto'
import Code from '../modals/verificationCode.modal.js'
import User from '../modals/user.modal.js'
import { handelError } from '../utils/handelError.js'
import jwt from 'jsonwebtoken'


export const sendVerificationCode = async (req,res,next) =>{


    const {email,id} = req.body

    const emailConfig = {
        service: process.env.SERVICE,
        host: process.env.HOST,
        port:process.env.PORT,
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    }

    const code = randomBytes(4).toString('hex').slice(0,4)

    






    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject: 'Verify you Email',
        text: ` Thanks for using your email to singup to our website. Please enter this code ${code} to verify your email`
    }

    try{

         await transporter.sendMail(mailOptions)

        const newCode = new Code({code})
        await newCode.save()


        res.status(200).json(newCode._id)


    }
    catch(e){
        next(e)
    }

  



}






export const verifyCode = async (req,res,next) => {

    const {code, codeId, userId} = req.body;



    try{
        const findCode = await Code.findById(codeId);

        if(findCode.code ===code){

            const check = await User.findByIdAndUpdate(userId,{
                emailVerified:true,
            },{new:true})


            if(check){
                const {password, ...rest} = check._doc


            const token = jwt.sign(
                {
                    id:check._id,
                    emailVerified: check.emailVerified,
                    onBoardingComplete:check.onBoardingComplete

                },
                process.env.JWT_SECRET
            )

            
             

            
            



            res.status(200).cookie('access_token', token ,{httpOnly:true}).json(rest)
            }
        }
        else{
           return next(handelError(401, "Incorrect Verification Code"))
        }

    }
    catch(e){
        next(e)
        
    }
}