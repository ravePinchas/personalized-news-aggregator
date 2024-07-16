const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../routes/notification-route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/', notificationRoutes);

// Mock Handlers
jest.mock('../handlers/notification-handler', () => ({
    sendEmailHandler: jest.fn(),
    sendTelegramHandler: jest.fn()
}));

const { sendEmailHandler, sendTelegramHandler } = require('../handlers/notification-handler');

describe('Notification Routes', () => {
    it('should send an email', async () => {
        sendEmailHandler.mockResolvedValue();
        const res = await request(app).post('/email/send').send({
            email: 'test@example.com',
            newsContent: 'This is a test email'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Email sent successfully' });
    });

    it('should send a telegram message', async () => {
        sendTelegramHandler.mockResolvedValue();
        const res = await request(app).post('/telegram/send').send({
            chat_id: '12345',
            text: 'This is a test message'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Message sent successfully' });
    });
});
