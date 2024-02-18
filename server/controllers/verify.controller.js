import nodemailer from 'nodemailer'
import {randomBytes} from 'node:crypto'
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


export const sendVerificationCode = async (req,res,next) =>{

  
    const {email} = req.body

    const code = randomBytes(4).toString('hex').slice(0,4)

    console.log(process.env.SERVICE, process.env.HOST, process.env.PORT, process.env.PASS, process.env.EMAIL)






    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject: 'Verify you Email',
        text: ` Thanks for using your email to singup to our website. Please enter this code ${code} to verify your email`
    }

    try{

        const res = await transporter.sendMail(mailOptions)
        console.log("Email Sent Success")

    }
    catch(e){
        next(e)
    }

  



}




