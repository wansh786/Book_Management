const mongoose= require("mongoose");

const BlacllistSchema=mongoose.Schema({
 token:String
})

const BlacklistModel=mongoose.model("blacklist",BlacllistSchema)

module.exports={
    BlacklistModel
}