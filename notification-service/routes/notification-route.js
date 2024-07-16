const express = require('express');
const { sendEmailController, sendTelegramController } = require("../controllers/notification-controller");
const { validateSendEmail, validateSendTelegram } = require('../validators/notification-validator');
const router = express.Router();

router.post('/email/send', validateSendEmail, sendEmailController);

router.post('/telegram/send', validateSendTelegram, sendTelegramController);

module.exports = router;
