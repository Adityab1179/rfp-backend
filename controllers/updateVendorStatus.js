const Vendors=require("../models/Vendor")
const url=require("url")
const updateVendorStatus=async(req,res)=>{
    try{
        const{id}=req.params;
        const {status}=req.body;
        const vendor=await Vendors.findById(id);
        const updatedStatus=await Vendors.findByIdAndUpdate(id,{status:status},{new:true});
        res.status(200).json({
            response:"success",
            message:"Vendor status updated successfully",
            data:{
                vendor:updatedStatus
            }
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports=updateVendorStatus
