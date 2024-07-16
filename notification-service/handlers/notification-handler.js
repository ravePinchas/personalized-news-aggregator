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
        html: `<h1>News update</h1><p>${newsContent}</p>`
    };
    await transporter.sendMail(mailOption);
};

const sendTelegramHandler = async (chat_id, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id,
        text
    });
};

const fetchNewsBasedOnPreferences = async (preferencesArray) => {
    const qPreferences = preferencesArray.join(' OR ');

    // Fetch news based on user's preference
    const newsResponse = await axios.get('https://newsdata.io/api/1/news', {
        params: {
            apikey: process.env.NEWS_API_KEY,
            q: qPreferences
        }
    });
    return newsResponse.data;
}

const sendNotifications = async (preferences, userPreferences) => {
    const newsContent = await fetchNewsBasedOnPreferences(preferences);

    if (userPreferences.channel === 'email') {
        await sendEmailHandler(userPreferences.email, newsContent);
    } else if (userPreferences.channel === 'telegram') {
        await sendTelegramHandler(userPreferences.chat_id, newsContent);
    }
};

const startConsumer = () => {
    const amqp = require('amqplib/callback_api');

    amqp.connect(`amqp://${process.env.RABBITMQ_HOST || 'localhost'}`, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const queue = 'news_queue';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, async (msg) => {
                console.log(" [x] Received %s", msg.content.toString());
                const messageContent = JSON.parse(msg.content.toString());

                // Here you can add your logic to fetch news and send notifications
                // Using the sent preferences
                await sendNotifications(messageContent.preferences, messageContent.userPreferences);

            }, {
                noAck: true
            });
        });
    });
};

startConsumer();

module.exports = {
    sendEmailHandler,
    sendTelegramHandler,
    startConsumer
};
