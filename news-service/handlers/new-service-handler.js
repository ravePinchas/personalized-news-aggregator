const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const fetchNewsHandler = async(preferencesArray) => {
    const qPreferences = preferencesArray.join(' OR ');

    // Fetch news based on user's preference
    const newsResponse = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
            apikey: NEWS_API_KEY,
            q: qPreferences
        }
    });
    return newsResponse;
}

module.exports = {
    fetchNewsHandler
}
