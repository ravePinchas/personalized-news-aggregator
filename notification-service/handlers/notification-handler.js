const nodeMailer = require('nodemailer')
require('dotenv').config()
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmailHandler = async(email, newsContent)=>{
    const mailOption = {
        from: process.env.EMAIL_USER_NAME,
        to: email,
        subject: 'your daily news update',
        html: `<h1>News update</h1> <p>${newsContent}</p>`
    }
    await transporter.sendMail(mailOption)
}

module.exports = {
    sendEmailHandler
}
