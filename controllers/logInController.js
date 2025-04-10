const Admin = require("../models/Admin");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let errors = [];

    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");

    if (errors.length > 0) {
      return res.status(400).json({ response: "error", error: errors });
    }

    // Find user (either Admin or Vendor)
    let user = await Admin.findOne({ email }) || await Vendor.findOne({ email });

    if (!user) {
      return res.status(401).json({ response: "error", error: ["Invalid Credentials"] });
    }

    // Check if the user is a Vendor and their status is "Inactive"
    if (user.role === "Vendor" && user.status === "Inactive") {
      return res.status(403).json({ response: "error", error: ["Your account is currently inactive. Please contact support."] });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ response: "error", error: ["Invalid Credentials"] });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      response: "success",
      user_id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      token, // Send Token
    });;

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ response: "error", error: ["Internal Server Error"] });
  }
};

module.exports = loginController;
