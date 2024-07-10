// news-service/routes/newsRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3003';

// GET /news/:userId - Fetch news based on user preferences
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch user's preference from user service
        const userResponse = await axios.get(`${USER_SERVICE_URL}/user/${userId}`);
        const { preference } = userResponse.data;
        
        if (!preference) {
            return res.status(400).json({ error: 'User has no preferences set' });
        }

        // Fetch news based on user's preference
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

module.exports = router;
