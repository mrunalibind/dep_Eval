let express=require("express");
var CryptoJS = require("crypto-js");
const { EncryptModel } = require("../model/encrypt_model");
let encryptedRouter=express.Router();

encryptedRouter.post("/encryptmypwd",async(req,res)=>{
    try {
        let {password}=req.body;
        
        var ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
        console.log(ciphertext)
        let user=new EncryptModel({password:ciphertext});

        await user.save();
        res.status(200).send({msg:"Password stored successfully in encrypted form"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})


encryptedRouter.get("/getmypwd",async(req,res)=>{
    try {
        let {id}=req.query;
        let user=await EncryptModel.findOne({_id:id});
        var bytes  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText);
        res.status(200).send({msg:originalText});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

module.exports={encryptedRouter};