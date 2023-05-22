let express=require("express");
const { connection } = require("./db");
const { encryptedRouter } = require("./route/encrypt_route");
const { hashRouter } = require("./route/hash_route");
let app=express();
app.use(express.json())
let cookie=require("cookie-parser");
const { productRouter } = require("./route/3rd_JWT_productRoute");
const { userRouter } = require("./route/3rd_JWT_route");
app.use(cookie())

app.use("/encrypt",encryptedRouter)
app.use("/hash",hashRouter)
app.use("/product",productRouter)
app.use("/user",userRouter)

app.listen(8070,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on port 8070")
})