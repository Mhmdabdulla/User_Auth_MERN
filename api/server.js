import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'


const app = express()
app.use(express.json())
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB connected'))
.catch((error)=>console.error(error))

app.use('/api/user',userRoute);
app.use('/api/auth',authRouter)

app.listen(3000, ()=> console.log('server running on',3000));