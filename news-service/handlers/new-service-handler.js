const axios = require('axios');
require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const fetchNewsBasedOnPreferences = async (preferencesArray) => {
    const qPreferences = preferencesArray.join(' OR ');

    // Fetch news based on user's preferences
    const newsResponse = await axios.get('https://newsdata.io/api/1/news', {
        params: {
            apikey: NEWS_API_KEY,
            q: qPreferences
        }
    });

    return newsResponse.data;
};

module.exports = {
    fetchNewsBasedOnPreferences
};
