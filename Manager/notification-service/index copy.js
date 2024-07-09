const express = require('express');
const nodemailer = require('nodemailer');
const { Telegraf } = require('telegraf');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

const bot = new Telegraf('your_telegram_bot_token');

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'your_email@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ message: 'Email sent: ' + info.response });
  });
});

app.post('/send-telegram', (req, res) => {
  const { chatId, message } = req.body;

  bot.telegram.sendMessage(chatId, message)
    .then(() => {
      res.json({ message: 'Message sent' });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.listen(3002, () => {
  console.log('Notification Service running on port 3002');
});
