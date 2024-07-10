const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3003';

app.get('/news/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userResponse = await axios.get(`${USER_SERVICE_URL}/user/${userId}`);
        const { preference } = userResponse.data;
        if (!preference) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }
        const newsResponse = await axios.get(`https://newsdata.io/api/1/news`, {
            params: {
                apikey: NEWS_API_KEY,
                q: preference
            }
        });
        res.json(newsResponse.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
});

app.listen(PORT, () => {
    console.log(`News Service is running on port ${PORT}`);
});

