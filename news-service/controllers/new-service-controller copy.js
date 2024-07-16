// news-service/controllers/news-service-controller.js
const amqp = require('amqplib/callback_api');
require('dotenv').config();

const fetchNewsController = async (req, res) => {
    const { preferences } = req.params;
    const preferencesArray = preferences.split(',');

    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        // Send the request to RabbitMQ for async processing
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
                    userPreferences: preferences // or add more user-specific information if needed
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

        res.status(202).json({ status: 'Request received. Processing in background.' });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
};

module.exports = {
    fetchNewsController
};
