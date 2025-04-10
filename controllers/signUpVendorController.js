const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Vendor = require("../models/Vendor");
const Category = require("../models/Category"); 
const Admin = require("../models/Admin")

const signUpVendorController = async (req, res) => {
  try {
    var {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      revenue,
      noOfEmployees,
      GSTNo,
      PANNo,
      phoneNo,
      category, 
    } = req.body;

    let errors = {};

   
    const existingUser = await Vendor.findOne({ email });
    if (existingUser) {
      errors.email = "User already exists.";
    }
    const adminUser=await Admin.findOne({email});
    if(adminUser){
      errors.email="Already registered as Admin"
    }
  
    const nameRegex = /^[A-Za-z]+$/;
    if (!firstName || !nameRegex.test(firstName)) {
      errors.firstName = "First name must contain only alphabets.";
    }
    if (!lastName || !nameRegex.test(lastName)) {
      errors.lastName = "Last name must contain only alphabets.";
    }

    
    if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Email is invalid.";
      }
    }

    
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 10) {
      errors.password = "Password length must be at least 10 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password must match.";
    }

    
    if (!revenue || isNaN(revenue)) {
      errors.revenue = "Revenue must be a number.";
    }
    if (!noOfEmployees || isNaN(noOfEmployees)) {
      errors.noOfEmployees = "No of Employees must be a number.";
    }

    if (!Array.isArray(category) || category.length === 0) {
      errors.category = "At least one category must be selected.";
    } else {
      const validCategories = await Category.find({ name: { $in: category } }).select("_id name");
      const validCategoryNames = validCategories.map(cat => cat.name);
      const categoryIds = validCategories.map(cat => cat._id);
      category = categoryIds;
    }

    if (!GSTNo) {
      errors.GSTNo = "GST No is required.";
    }
    if (!PANNo) {
      errors.PANNo = "PAN No is required.";
    }

    if (!phoneNo) {
      errors.phoneNo = "Phone No is required.";
    } else if (!phoneNo.match(/^[0-9]{10}$/)) {
      errors.phoneNo = "Enter a valid 10-digit mobile number.";
    }

    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ response: "error", errors });
    }


    const newPassword = await bcrypt.hash(password, 10);


    const newVendor = new Vendor({
      firstName,
      lastName,
      email,
      password: newPassword,
      revenue,
      noOfEmployees,
      GSTNo,
      PANNo,
      phoneNo,
      category,
    });

    await newVendor.save();
    res.status(201).json({ response: "success" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ response: "error", errors: { form: error.message } });
  }
};

module.exports = signUpVendorController;
