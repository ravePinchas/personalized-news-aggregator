const express = require('express');
const { fetchNewsController } = require('../controllers/new-service-controller');
const router = express.Router();
require('dotenv').config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3003';

// GET /news/:userId - Fetch news based on user preferences
router.get('/:preferences', fetchNewsController);

module.exports = router;
