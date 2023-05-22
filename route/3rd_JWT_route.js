let express=require("express");
const { UserModel } = require("../model/3rd_JWT_model");
let userRouter=express.Router();
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklist_model");
require("dotenv").config();

userRouter.post("/signup",async(req,res)=>{
    try {
        let {role,email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send({msg:"User is already Present"});
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            let user=new UserModel({role,email,password:hash});
            await user.save();
            res.status(200).send({msg:"Registeration successfully."})
        });
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).send({msg:"User is Not Present"});
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
             let accessToken=jwt.sign({ userRole: user.role, userId:user._id }, process.env.accessToken,{
                expiresIn:"1m"
             })
             let refreshToken=jwt.sign({ userRole: user.role, userId:user._id }, process.env.refreshToken,{
                expiresIn:"5m"
             })
             res.cookie("accessToken",accessToken)
             res.cookie("refreshToken",refreshToken)
             res.status(200).send({msg:"Login Successfull"})
            }
         });
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

userRouter.get("/refresh-token",async(req,res)=>{
    try {
        let refreshToken=req.cookies.refreshToken;

        let isTokenValid=jwt.verify(refreshToken,process.env.refreshToken);
        if(!isTokenValid){
            return res.send({msg:"lof=gin Again"})
        }

        let newaccessToken=jwt.sign({ userRole: user.role, userId:user._id }, process.env.accessToken,{
            expiresIn:"1m"
         })
         res.cookie("accessToken",newaccessToken)
         res.status(200).send({msg:"Token Generated"})

    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

userRouter.get("/logout",async(req,res)=>{
    try {
        let accessToken=req.cookies.accessToken;
        let tokenBlacklist=await BlacklistModel.findOne({token:accessToken});
        if(tokenBlacklist){
            return res.status(400).send({msg:"You have LoggedOut alreagy, Login again"})
        }
        let black=new BlacklistModel({token:accessToken});
        await black.save();
        res.status(200).send({msg:"Logout Successfully"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

module.exports={userRouter}