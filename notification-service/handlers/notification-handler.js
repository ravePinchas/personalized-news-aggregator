const nodeMailer = require('nodemailer')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')

const {MY_TOKEN, SERVER_URL} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${MY_TOKEN}`
const URI = `/webhook/${MY_TOKEN}`
const WEBHOOK_URL = SERVER_URL+URI

const app = express()
app.use(bodyParser.json())
require('dotenv').config()


const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data);
}


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


const sendTelegramHandler = async(messageObj, messageText)=>{
    return getAxiosInstance.get("sendMessage", {
        chat_id: messageObj.chat_id,
        text: messageText
    })
}

module.exports = {
    sendEmailHandler,
    sendTelegramHandler
}
