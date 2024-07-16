const express = require('express');
const { fetchNewsController } = require('../controllers/new-service-controller');
const { validateFetchNews } = require('../validators/news-validator');
const router = express.Router();

router.get('/:preferences', validateFetchNews, fetchNewsController);

module.exports = router;
