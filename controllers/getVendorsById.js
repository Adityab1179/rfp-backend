const Vendors=require("../models/Vendor")
const getVendorsById=async(req,res)=>{
    try {
        const { categoryId } = req.query;
        console.log(categoryId)
        if (!categoryId) {
          return res.status(400).json({ error: "Category is required" });
        }
    
        const vendors = await Vendors.find({ category:categoryId });
        console.log(vendors)
        res.status(200).json(vendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    module.exports=getVendorsById