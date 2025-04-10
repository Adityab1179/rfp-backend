const mongoose=require("mongoose")

const RFP = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    lastDate: {
        type: Date,
        default: Date.now,
    },
    minimumPrice: {
        type: Number,
        required: true,
    },
    maximumPrice: {
        type: Number,
        required: true,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    selectedVendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor", 
    }]
});

module.exports = mongoose.model("RFP", RFP);
