const User = require("../models/UserModel");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const ResetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Enter the Email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found, Enter the Correct Email id",
      });
    }
    const token = crypto.randomUUID();
    const url = `https://localhost:5000/updatePassword/${token}`;
    await mailSender(
      email,
      "Link to Reset Password",
      `Here is your link to reset your account password ${url}`
    );
    const updatedData = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        expiresInTime: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Link sent successfully",
      newdata: updatedData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal error Occured",
    });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid Link",
      });
    }
    const user = await User.findone({ token: token });
    if (user.expiresInTime < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Link Expired",
      });
    }
    const { password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password Do not Match",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedData = await User.findOneAndUpdate(
      { email: user.email },
      { password: hashedPassword, token: null, expiresInTime: null },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
      data: updatedData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal error Occured",
    });
  }
};

module.exports = { ResetPasswordToken, ResetPassword };
