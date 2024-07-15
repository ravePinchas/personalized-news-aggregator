const { fetchNewsHandler } = require("../handlers/new-service-handler");

const fetchNewsController = async(req, res) => {
    const { preferences } = req.params;
    const preferencesArray = preferences.split(',')
    try {
        if (!preferences) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        const newsResponse = await fetchNewsHandler(preferencesArray)
        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
}

module.exports = {
    fetchNewsController
}