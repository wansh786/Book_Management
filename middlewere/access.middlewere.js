const access=(permit)=>{
    return(req,res,next)=>{
        if(permit.includes(req.role)){
            next()
        }
        else{
            res.send({msg:"You are not authorised"})
        }
    }
}
module.exports={
    access
}