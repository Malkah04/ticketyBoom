const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../models/User');
const bcrypt =require('bcryptjs')

// signup

router.post('/register' ,asyncHandler(async(req,res)=>{
    const {userName ,email ,role} = req.body
    let user =await User.findOne({email :email})
    if(user){
        return res.status(400).json({message:'user already exist'})
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password =await bcrypt.hash( req.body.password ,salt);
    const newUser = new User({
        userName,
        email,
        password :req.body.password,
        role
    })
    const result =await newUser.save();
    const token =null

    // to send all data to user but not password
    const {password ,...others} =result._doc
    res.status(201).json({...others ,token});
}))

// login

router.post('/login' ,asyncHandler(async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({message:'invaild email or password'})
    }
     const isPasswordMatch =await bcrypt.compare(req.body.password , user.password);
    if(!isPasswordMatch){
        return res.status(400).json("wrong password")
    }
    const token =null
    const {password ,...other} =user._doc;  
    res.status(201).json({...other ,token});
}))

module.exports= router