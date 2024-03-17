const mongoose= require("mongoose");

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["admin","librarian","reader"],
        default:"reader"
    }
})

const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}