const axios = require('axios');
const { DaprClient, HttpMethod } = require('dapr-client');
require('dotenv').config();

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprClient = new DaprClient(`http://localhost:${daprPort}`);

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const fetchNewsHandler = async (preferencesArray) => {
    const qPreferences = preferencesArray.join(' OR ');

    // Fetch news based on user's preference
    const newsResponse = await axios.get('https://newsdata.io/api/1/news', {
        params: {
            apikey: NEWS_API_KEY,
            q: qPreferences
        }
    });

    return newsResponse.data;
};

const sendToDapr = async (preferencesArray, userPreferences) => {
    const data = {
        preferences: preferencesArray,
        userPreferences
    };

    await daprClient.invokeService(HttpMethod.POST, 'notification-service', 'sendNotifications', data);
};

module.exports = {
    fetchNewsHandler,
    sendToDapr
};
