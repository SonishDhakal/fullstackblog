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

import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

// Your email credentials and details
const emailConfig = {
    service:'gmail',
  host: 'smtp.GMAIL.com', // Replace with your SMTP server
  port: 587, // Replace with your SMTP port
  secure: false, // Use true for TLS, false for STARTTLS
  auth: {
    user: 'sonishdhakal122@gmail.com',
    pass: 'knim nqmz buoe rdaf '
  }
};

// Function to send the email
async function sendEmail() {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: 'sonishdhakal122@gmail.com',
    to: 'sonishdhakal1021@gmail.com',
    subject: 'Email from Node.js server',
    text: 'This is an email sent from your Node.js server using Nodemailer and Express.'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// GET route to trigger email sending
app.get('/', async (req, res) => {
  try {
    await sendEmail();
    res.send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




