const { fetchNewsHandler } = require("../handlers/new-service-handler");
const DaprClient = require('@dapr/dapr').DaprClient;
require('dotenv').config();

const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || 3500;
const daprClient = new DaprClient(`http://localhost:${DAPR_HTTP_PORT}`, DAPR_HTTP_PORT);

const fetchNewsController = async (req, res) => {
    const { preferences } = req.params;
    const preferencesArray = preferences.split(',');

    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        // Fetch user preferences using Dapr service invocation
        const userPreferencesResponse = await daprClient.invoker.invoke('user-service', `user/${preferences}`, 'GET');
        const userPreferences = userPreferencesResponse.preferences;

        // Fetch news based on user preferences
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
