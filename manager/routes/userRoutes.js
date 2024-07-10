// manager/routes/userRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3003';

// GET /user/:userId - Fetch user details by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userResponse = await axios.get(`${USER_SERVICE_URL}/user/${userId}`);
        res.json(userResponse.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});

module.exports = router;
