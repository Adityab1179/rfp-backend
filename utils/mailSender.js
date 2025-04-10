const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email,title, body) => {
  try {
    const transporter = nodemailer.tranporter({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject:title,
      text:body
    });
    return info;
  } catch (err) {
    console.log(`error occured while send the mail ${err}`);
  }
};
module.exports = mailSender;
