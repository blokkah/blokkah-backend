
const config = require("../../config/config")
console.log(process.env.SENDGRID_API_KEY)
const emailServiceSendGrid = require("../../services/emailServiceSendGrid");


 

 emailServiceSendGrid.emailPasswordResetInstructions("sasa1x2001@gmail.com", "mostafa", "token");