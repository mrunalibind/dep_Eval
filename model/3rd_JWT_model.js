let mongoose=require("mongoose");
let userSchema=mongoose.Schema({
    role:{type:String,required:true,enum:["user","seller"],default:"user"},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

let UserModel=mongoose.model("user",userSchema);
module.exports={UserModel};