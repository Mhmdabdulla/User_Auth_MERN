import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utlis/error.js';


export const signup = async (req,res,next)=>{
    try {
        const {username,email,password} = req.body;
        const hashedPass = bcryptjs.hashSync(password,10);
        const newUser = new User({username,email,password:hashedPass});
        await newUser.save();
        res.status(201).json({message:'User created successfully'})
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };


 export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};



export const adminSignin = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email, isAdmin: true });
    if (!validUser) {
      return next(errorHandler(401, "Not authorised as admin"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};