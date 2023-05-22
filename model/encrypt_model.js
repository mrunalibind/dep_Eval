let mongoose=require("mongoose");
let encryptSchema=mongoose.Schema({
    password:{type:String,required:true}
})

let EncryptModel=mongoose.model("encryptedpwds",encryptSchema);
module.exports={EncryptModel};