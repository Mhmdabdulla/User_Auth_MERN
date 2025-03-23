import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { error } from 'console';

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB connected'))
.catch((error)=>console.error(error))

app.listen(3000, ()=> console.log('server running on',3000));