
const { BookModel } = require("../model/book.model");


bookRouter.use(limiter)

exports.addBook =async(req,res)=>{
    const payload=req.body
    try {
        const user=new BookModel(payload);
        await user.save()
        res.status(200).json({"msg":"Book added", "addedBook":user})
    } catch (error) {
        res.status(400).json({error:error})
    }
}

exports.updateBook=async(req,res)=>{
    const payload=req.body;
    const {userId}=req.params;
    try {
        await BookModel.findByIdAndUpdate({_id:userId},payload);
        res.status(200).json({"msg":"Book has been updated"})
    } catch (error) {
        res.status(400).json({error:error})
    }
}

exports.deleteBook =async(req,res)=>{
    const {userId}=req.params;
    try {
        await BookModel.findByIdAndUpdate({_id:userId});
        res.status(200).json({"msg":"Book has been deleted"})
    } catch (error) {
        res.status(400).json({error:error})
    }
}

