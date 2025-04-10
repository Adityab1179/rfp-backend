const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  revenue: { type: Number, required: true },
  noOfEmployees: { type: Number, required: true },
  GSTNo: { type: String, required: true },
  PANNo: { type: String, required: true },
  phoneNo: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Inactive" },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  role: { type: String, default: "Vendor" },
  RFPs: [{ type: mongoose.Schema.Types.ObjectId, ref: "RFP" }],
});

module.exports = mongoose.model("Vendor", vendorSchema);
