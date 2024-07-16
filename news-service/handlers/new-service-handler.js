const axios = require('axios');
const amqp = require('amqplib/callback_api');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const fetchNewsHandler = async (preferencesArray, userPreferences) => {
    const qPreferences = preferencesArray.join(' OR ');

    // Fetch news based on user's preference (for demo purposes, this can be refined)
    const newsResponse = await axios.get('https://newsdata.io/api/1/news', {
        params: {
            apikey: NEWS_API_KEY,
            q: qPreferences
        }
    });

    return newsResponse.data;
};

const sendToQueue = async (preferencesArray, userPreferences) => {
    amqp.connect(`amqp://${process.env.RABBITMQ_HOST || 'localhost'}`, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const queue = 'news_queue';
            const msg = JSON.stringify({
                preferences: preferencesArray,
                userPreferences // or add more user-specific information if needed
            });

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    });
};

module.exports = {
    fetchNewsHandler,
    sendToQueue
};
