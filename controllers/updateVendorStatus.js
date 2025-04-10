const mongoose = require("mongoose");
const Vendor=require("../models/Vendor")
const nodemailer=require("nodemailer")
require("dotenv").config()
const updateVendorStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const vendorId = req.params.id;
  
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ response: "error", error: "Vendor not found" });
      }
  
      vendor.status = status;
      await vendor.save();
  
      if (status === "Active") {
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("MAIL_PASS:", process.env.MAIL_PASS);
        sendActivationEmail(vendor.email, vendor.firstName);
        console.log("sending mail")
      }
  
      return res.status(200).json({ response: "success", message: "Vendor status updated" });
    } catch (error) {
      console.error("Error updating vendor status:", error);
      res.status(500).json({ response: "error", error: "Server error" });
    }
  };
  

  const sendActivationEmail = async (email, name) => {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
  
      let mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Account Activated",
        text: `Hello ${name},\n\nYour account has been activated. You can now log in.`
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Activation email sent to:", email);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  module.exports =  updateVendorStatus ;