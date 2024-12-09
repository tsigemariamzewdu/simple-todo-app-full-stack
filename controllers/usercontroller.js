const User=require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')


exports.register=async (req,res)=>{
    const {name,email,password}=req.body;

    try{
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:'email already in use'})
            
        }
        const user= new User({name,email,password});
        await user.save();
        

        const token=jwt.sign({id:user._id},"your_jwt_secret",{expiresIn:"1h"})
        res.status(201).json({token,msg:"user registerd successfully"})
    }catch(error){
        res.status(500).json({error:"user registration failed"})

    }
}
exports.login=async(req,res)=>{
    const{email,password}=req.body;

    try{
        //checkin if the user exists
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({error:"user not found"})
        }

        //verify the password
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){

            return res.status(401).json({error:"invalid credentials"})
        }

        //generate a jwt token
        const token=jwt.sign({id:user._id},"your_jwt_secret",{expiresIn:"24h"});
        res.status(200).json({message:"login succesfull",token})
            }catch(error){

            }}
