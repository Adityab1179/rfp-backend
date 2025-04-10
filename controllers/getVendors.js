const Vendors=require("../models/Vendor")
const  getVendors=async(req,res)=>{
    try{const vendors= await Vendors.find();
    if(!vendors){
        return res.status(200).json({
            message:"No Vendor present"
        })
    }
    else{
        return res.status(200).json({ response: "success", data: vendors });
    }}
    catch(err){
        res.status(500).json({ response: "error", error: "Internal Server Error" });
  }
    }
    
   
module.exports=getVendors;