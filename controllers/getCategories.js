const Vendor=require("../models/Vendor")
const Category=require("../models/Category")
const getCategories=async(req,res)=>{
    try {
        const categories = await Category.find();
    
    if (categories.length === 0) {
      return res.status(200).json({ message: "No categories available, Contact Admin", categories: [] });
    }

    res.status(200).json({categories});
      } catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
      }
}
module.exports=getCategories