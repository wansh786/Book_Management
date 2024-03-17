
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require("../model/blacklist.model");
const { auth } = require("../middlewere/auth.middlewere");


exports.registerUser =("/register",async(req,res)=>{
    let {pass}=req.body
    const uppperCase=/[A-Z]/.test(req.body.pass);
    const number=/[0-9]/.test(req.body.pass);
    const specialChar=/[~!@#$%^&*(){}<>.,'";:?/]/.test(req.body.pass);

    if(uppperCase,number,!specialChar){
        res.status(200).send({msg:"Password does not follow the password policy"});
        return
    }
    if(pass.length<8){
        res.status(200).send({msg:"Password is too short"});
        return
    }
    try {
        let exist=await UserModel.findOne({email:req.body.email});
        if(exist){
            res.status(200).send({msg:"user is exist in the database"});
            return
        }
    } catch (error) {
        res.status(400).send({"error":error});
    }

    try {
        bcrypt.hash(req.body.pass,5,async(err,hash)=>{
            if(err){
                res.status(400).send({"error":err}) 
            }
            else{
                let user=new UserModel({...req.body,pass:hash})
                await user.save()
                res.status(200).send({msg:"The new user has been registered", "registeredUser":user})
            }
        })
    } catch (error) {
        res.status(400).send({"error":error});
    }
})

exports.loginUser=("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,name:user.name},"masai",{expiresIn:10000})
                    // const expery_token=jwt.sign({userID:user._id},"masai",{expiresIn:5000})
                    res.status(200).json({msg:"Login Successful",token})
                }
                else{
                    res.status(200).json({msg:"Please register first!."})
                }
            })
        }
        else{
            res.status(200).json({msg:"Wrong Credentials"})
        }
    } catch (error) {
        res.status(400).send({"error":error});
    }
})

exports.logoutUser=("/logout",auth,async(req,res)=>{
    let token=req.headers.authorization?.split(" ")[1];
    try {
        let blacklist=new BlacklistModel({token:token});
        await blacklist.save()
        res.status(400).send({msg:"user has been logged out"})
    } catch (error) {
        res.status(400).send({"error":error});
    }
})

