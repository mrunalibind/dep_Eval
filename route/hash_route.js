let express=require("express");
let bcrypt=require("bcrypt");
const { HashModel } = require("../model/hash_model");

let hashRouter=express.Router();

hashRouter.post("/hashmypwd",async(req,res)=>{
    try {
        let {password}=req.body;
        bcrypt.hash(password, 5, async function(err, hash) {
            let user=new HashModel({password:hash});
            await user.save();
            res.status(200).send({msg:"Hash of the Password stored successfully."})
        });
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

hashRouter.post("/verifymypwd",async(req,res)=>{
    try {
        let {id,password}=req.body;
        let user=await HashModel.findOne({_id:id})

        bcrypt.compare(password, user.password, function(err, result) {
           if(result){
            res.status(200).send(true);
           }
           else{
            res.status(200).send(false);
           }
        });
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

module.exports={hashRouter}