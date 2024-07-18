const express = require('express');
const { fetchNewsController } = require('../controllers/news-controller');

const router = express.Router();

// GET /news/:preferences - Fetch news based on user preferences
router.get('/:preferences', fetchNewsController);

module.exports = router;
