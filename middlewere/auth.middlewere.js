const jwt=require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const auth=async(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1];
    if(token){
        try {
            const decoded=jwt.verify(token,"masai")
            const {userID}=decoded;
            const user=await UserModel.findOne({_id:userID});
            const require_role=user?.role;
            req.role=require_role;
            next()
        } catch (error) {
            res.json({error:error})
        }
    }
    else{
        res.status(200).send({msg:"Please Login First...!"})
    }
}

module.exports={
    auth
}