const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

module.exports = transporter;