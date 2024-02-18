import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
const app = express();
import authRoute from './routes/auth.route.js'
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





app.listen(3000, CoonectToDb)