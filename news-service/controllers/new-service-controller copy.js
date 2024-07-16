const { fetchNewsHandler } = require("../handlers/new-service-handler");
const axios = require('axios');
require('dotenv').config();

const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || 3500;
const USER_SERVICE_URL = `http://localhost:${DAPR_HTTP_PORT}/v1.0/invoke/user-service/method/user`;

const fetchNewsController = async(req, res) => {
    const { preferences } = req.params;
    const preferencesArray = preferences.split(',');

    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        const userPreferencesResponse = await axios.get(`${USER_SERVICE_URL}/${preferences}`);
        const userPreferences = userPreferencesResponse.data.preferences;

        const newsResponse = await fetchNewsHandler(userPreferences);
        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
}

module.exports = {
    fetchNewsController
}