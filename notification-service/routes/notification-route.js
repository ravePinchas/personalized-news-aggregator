const express = require('express');
const router = express.Router();
const { sendEmailController, sendTelegramController } = require("../controllers/notification-controller");

router.get('*', (req, res) => {
    res.send("hello")
}
)

router.post('*', async(req, res) => {
    console.log(req.body);
}
)

router.post('email/send', sendEmailController)

// router.post('telegram/send', sendTelegramController)



module.exports = router;