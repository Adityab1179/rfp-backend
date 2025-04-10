const Category=require("../models/Category")
const updatingMultipleCtaegories=async(req,res)=>{
    try {
        const { categories } = req.body;
    
        for (const category of categories) {
          await Category.findByIdAndUpdate(category._id, { name: category.name });
        }
    
        res.json({ message: "Categories updated successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to update categories" });
      }
    }
    module.exports=updatingMultipleCtaegories