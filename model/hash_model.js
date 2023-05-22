let mongoose=require("mongoose");
let hashSchema=mongoose.Schema({
    password:{type:String,required:true}
})

let HashModel=mongoose.model("hashedpwds",hashSchema);
module.exports={HashModel};