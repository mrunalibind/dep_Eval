let jwt=require("jsonwebtoken");
function authRole(role){
    return (req,res,next)=>{
        let accessToken=req.cookies.accessToken;
        jwt.verify(accessToken, process.env.accessToken, function(err, decoded) {
            if(role.includes(decoded.userRole)) {
                next();
            }
            else{
                res.status(500).send({msg:"Unauthorized"})
            }
          });
    }
}
module.exports={authRole}