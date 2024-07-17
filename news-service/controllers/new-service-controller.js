const { sendToDapr } = require('../handlers/new-service-handler');

const fetchNewsController = async (req, res) => {
    const { preferences } = req.params;
    const preferencesArray = preferences.split(',');

    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        // Send the request to Dapr for async processing using the handler
        await sendToDapr(preferencesArray, preferences);

        res.status(202).json({ status: 'Request received. Processing in background.' });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
};

module.exports = {
    fetchNewsController
};
