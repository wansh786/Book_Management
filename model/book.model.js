const mongoose= require("mongoose");

const BookSchema=mongoose.Schema({
 title:String,
 genre:String,
 author:String,
 publishing_year:Number
})

const BookModel=mongoose.model("book",BookSchema)

module.exports={
    BookModel
}