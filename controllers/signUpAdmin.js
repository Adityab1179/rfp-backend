const Admin = require("../models/Admin");
const Vendor=require("../models/Vendor")
const bcrypt= require("bcrypt");
const signUpAdmin = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors={};
  if (!firstName) {
    errors.firstName="Firstname is required";
  }
  if (!lastName) {
    errors.lastName="Lastname is required";
  }
  if (!email) {
    errors.email="Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email="Email is invalid";
  }
  if (!password) {
    errors.password="Password is required";
  }
  if (!confirmPassword) {
    errors.confirmPassword="Confirm Password is required";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword="Password and Confirm Password should be same";
  }
  const user = await Admin.findOne({email});
  
  if (user) {
    errors.email="User already exist."
  }
  const duplicateUser = await Vendor.findOne({email});
  if(duplicateUser) {
    errors.email="User already registered as Vendor"
  }
  if(Object.keys(errors).length>0){
    res.status(200).json({
      response:"error",
      error:errors
    })
  }
  const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newAdmin.save();
    return res.status(200).json({ response: "success", data: newAdmin });
};
module.exports = signUpAdmin;
