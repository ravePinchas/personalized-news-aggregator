const express = require('express');
const router = express.Router();
const { sendEmailController, sendTelegramController, sendNotificationsController } = require('../controllers/notification-controller');

router.post('/email/send', sendEmailController);
router.post('/telegram/send', sendTelegramController);
router.post('/sendNotifications', sendNotificationsController);

module.exports = router;
