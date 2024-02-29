import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js'
import verifyRoute from './routes/verify.route.js'
import profileRoute from './routes/profile.route.js'
import postRoute from './routes/post.route.js'
import commentRoute  from './routes/commet.route.js'

const app = express();

dotenv.config()



async function CoonectToDb(){
    try{
        await mongoose.connect(process.env.MONGOOSE)
        console.log('db is runninhg')

    }
    catch(e){
        console.log(e)
        
    }
}



app.use(cookieParser())
app.use(express.json())



app.use('/api/auth', authRoute)
app.use('/api/verificationcode', verifyRoute)
app.use('/api/profile', profileRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)




app.use((err,req,res,next) =>{

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})





app.listen(3000, CoonectToDb)