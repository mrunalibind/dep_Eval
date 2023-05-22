let express=require("express");
const { ProductModel } = require("../model/3rd_JWT_model_forProduct");
const { authRole } = require("../middleware/auth_role");

let productRouter=express.Router();

productRouter.post("/addproducts",authRole(["seller"]),async(req,res)=>{
    try {
        let {name,price}=req.body;
        let product=new ProductModel({name,price});
        await product.save();
        res.status(200).send({msg:"Product Created"});
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})
productRouter.get("/products",async(req,res)=>{
    try {
        let product=await ProductModel.find();
        res.status(200).send({msg:product});
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})
productRouter.delete("/deleteproducts",authRole(["seller"]),async(req,res)=>{
    try {
        let {id}=req.query;
        let product=await ProductModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Product Deleted"});
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})
module.exports={productRouter}