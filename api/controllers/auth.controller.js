import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';

export const signup = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        const hashedPass = bcryptjs.hashSync(password,10);
        const newUser = new User({username,email,password:hashedPass});
        await newUser.save();
        res.status(201).json({message:'User created successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}