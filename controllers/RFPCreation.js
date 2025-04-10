const RFP = require("../models/RFP");
const Vendor = require("../models/Vendor");
const mongoose=require("mongoose")

const RFPCreation = async (req, res) => {
  try {
    const {
      itemName,
      itemDescription,
      itemQuantity,
      lastDate,
      minimumPrice,
      maximumPrice,
      categoryId,
      selectedVendors,
    } = req.body;
    let errors = {};

    if (!itemName) errors.itemName = "Item Name is required.";
    if (!itemDescription) errors.itemDescription = "Description is required.";
    if (!itemQuantity) errors.itemQuantity = "Item Quantity is required.";
    if (!lastDate) errors.lastDate = "Last Date is required.";
    if (!minimumPrice) errors.minimumPrice = "Minimum Price is required.";
    if (!maximumPrice) errors.maximumPrice = "Maximum Price is required.";
    if (!categoryId) errors.category = "Category is required.";
    if (!selectedVendors || selectedVendors.length === 0)
      errors.selectedVendors = "At least one vendor must be selected.";

    if (minimumPrice && isNaN(minimumPrice))
      errors.minimumPrice = "Minimum Price must be a number.";
    if (maximumPrice && isNaN(maximumPrice))
      errors.maximumPrice = "Maximum Price must be a number.";
    const minPriceNum = parseFloat(minimumPrice);
    const maxPriceNum = parseFloat(maximumPrice);
    
    if (!isNaN(minPriceNum) && !isNaN(maxPriceNum) && maxPriceNum < minPriceNum)
      errors.maximumPrice = "Maximum Price must be greater than Minimum Price.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({response:"Failed", errors });
    }
    const vendorObjectIds = selectedVendors.map(id => new mongoose.Types.ObjectId(id));
    const newRFP = new RFP({
      itemName,
      itemDescription,
      itemQuantity,
      lastDate,
      minimumPrice,
      maximumPrice,
      categoryId,
      selectedVendors:vendorObjectIds,
    });

    await newRFP.save();

    await Promise.all(
      selectedVendors.map(async (vendorId) => {
        await Vendor.findByIdAndUpdate(
          vendorId,
          { $push: { rfps: newRFP._id } }, 
          { new: true, useFindAndModify: false }
        );
      })
    );

    res.status(201).json({ response:"success",message: "RFP created successfully!", rfp: newRFP });
  } catch (err) {
    console.error("Error creating RFP:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = RFPCreation;
