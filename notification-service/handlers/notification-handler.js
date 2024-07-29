const nodeMailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || 3500;
const DAPR_URL = `http://localhost:${DAPR_HTTP_PORT}/v1.0/invoke/news-service/method/news`;

let transporter;

const initTransporter = () => {
    transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
}

const sendEmailHandler = async (email, newsContent) => {
    if (!transporter) {
        initTransporter();
    }
    const mailOptions = {
        from: process.env.EMAIL_USER_NAME,
        to: email,
        subject: 'Your daily news update',
        html: `<h1>News update</h1><p>${newsContent}</p>`
    };
    await transporter.sendMail(mailOptions);
};

const sendTelegramHandler = async (chat_id, text) => {
    const TELEGRAM_API = `https://api.telegram.org/bot${process.env.MY_TOKEN}`;
    await axios.post(`${TELEGRAM_API}/sendMessage`, { chat_id, text });
};

const sendNotifications = async (preferences, userPreferences) => {
    const preferencesArray = preferences.split(',');
    const daprResponse = await axios.post(`${DAPR_URL}/${userPreferences}`, { preferences: preferencesArray });
    const newsContent = daprResponse.data;
    
    await Promise.all([
        sendEmailHandler(userPreferences.email, newsContent),
        sendTelegramHandler(userPreferences.chat_id, newsContent)
    ]);
};

module.exports = {
    sendEmailHandler,
    sendTelegramHandler,
    sendNotifications
};
