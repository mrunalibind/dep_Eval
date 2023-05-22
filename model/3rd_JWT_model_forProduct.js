let mongoose=require("mongoose");
let productSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true}
})

let ProductModel=mongoose.model("product",productSchema);
module.exports={ProductModel};