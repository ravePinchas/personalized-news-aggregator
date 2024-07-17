const nodeMailer = require('nodemailer');
const axios = require('axios');
let transporter;

const initTransporter = () => {
    transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

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

module.exports = {
    sendEmailHandler,
    sendTelegramHandler
};
