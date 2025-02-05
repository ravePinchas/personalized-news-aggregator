const { sendEmailHandler, sendTelegramHandler } = require('../handlers/notification-handler');
const { validateSendEmail, validateSendTelegram } = require('../validators/notification-validator');

describe('Notification Service Handler', () => {
    it('should send an email', async () => {
        const emailData = { email: 'test@example.com', newsContent: 'This is a test email' };
        const validationResult = validateSendEmail(emailData);

        expect(validationResult.error).toBeNull();

        const result = await sendEmailHandler(emailData.email, emailData.newsContent);

        expect(result).toBeDefined();
    });

    it('should send a telegram message', async () => {
        const telegramData = { chat_id: '12345', text: 'Test message' };
        const validationResult = validateSendTelegram(telegramData);

        expect(validationResult.error).toBeNull();

        const result = await sendTelegramHandler(telegramData.chat_id, telegramData.text);

        expect(result).toBeDefined();

    });
});
