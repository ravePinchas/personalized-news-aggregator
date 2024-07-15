const express = require('express');
const router = express.Router();
const { sendEmailController } = require("../controllers/notification-controller");

router.post('/send', sendEmailController)

module.exports = router;