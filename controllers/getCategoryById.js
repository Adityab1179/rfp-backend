const Category=require("../models/Category")
const getCategoryById=async(req,res)=>{
    try{
        const {id}=req.params;
        const category=await Category.findById(id);
        // console.log(category)
        res.status(200).json({
            category:category
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports=getCategoryById