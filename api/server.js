import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
import adminRoute from './routes/admin.router.js'
import cookieParser from 'cookie-parser';


const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB connected'))
.catch((error)=>console.error(error))

app.listen(3000, ()=> console.log('server running on',3000));

app.use('/api/user', userRoute);
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRoute)

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statuscode).json({
        success:false,
        message,
        statuscode
    })
})