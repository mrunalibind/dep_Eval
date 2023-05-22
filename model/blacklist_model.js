let mongoose=require("mongoose");
let blacklistSchema=mongoose.Schema({
    token:{type:String,required:true}
})

let BlacklistModel=mongoose.model("blacklist",blacklistSchema);
module.exports={BlacklistModel};