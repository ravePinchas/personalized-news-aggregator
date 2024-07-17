const { sendEmailHandler, sendTelegramHandler, sendNotifications } = require('../handlers/notification-handler');

const sendEmailController = async (req, res) => {
    try {
        const { email, newsContent } = req.body;
        await sendEmailHandler(email, newsContent); // Need to do validation
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const sendTelegramController = async (req, res) => {
    try {
        const { chat_id, text } = req.body; // Expect chat_id and text from request body
        await sendTelegramHandler(chat_id, text); // Need to do validation
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const sendNotificationsController = async (req, res) => {
    try {
        const { preferences, userPreferences } = req.body; // Expect preferences and userPreferences from request body
        await sendNotifications(preferences, userPreferences); // Need to do validation
        res.status(200).json({ message: 'Notifications sent successfully' });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    sendEmailController,
    sendTelegramController,
    sendNotificationsController
};
