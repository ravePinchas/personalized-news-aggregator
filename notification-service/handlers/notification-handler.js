const nodeMailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const { MY_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${MY_TOKEN}`;

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmailHandler = async (email, newsContent) => {
    const mailOption = {
        from: process.env.EMAIL_USER_NAME,
        to: email,
        subject: 'Your daily news update',
        html: `<h1>News update</h1> <p>${newsContent}</p>`
    };
    await transporter.sendMail(mailOption);
};

const sendTelegramHandler = async (chat_id, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id,
        text
    });
};

module.exports = {
    sendEmailHandler,
    sendTelegramHandler
};
