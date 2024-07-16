const request = require('supertest');
const express = require('express');
const newsRoutes = require('../routes/newsRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/news', newsRoutes);

// Mock Handlers
jest.mock('../handlers/new-service-handler', () => ({
    fetchNewsHandler: jest.fn()
}));

const { fetchNewsHandler } = require('../handlers/new-service-handler');

describe('News Routes', () => {
    it('should fetch news based on preferences', async () => {
        fetchNewsHandler.mockResolvedValue({ data: { articles: [{ title: 'Test News' }] } });
        const res = await request(app).get('/news/news');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ articles: [{ title: 'Test News' }] });
    });
});
