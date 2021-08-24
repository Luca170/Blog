const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")

router.get("/email", (req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '********@gmail.com',
          pass: '******'
        }
      });
      
      var mailOptions = {
        from: '*******@gmail.com',
        to: '******@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
})