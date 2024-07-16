const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

// Mock MongoDB handlers
jest.mock('../handlers/user-handler', () => ({
    getUserHandler: jest.fn(),
    getUsersHandler: jest.fn(),
    createUserHandler: jest.fn(),
    updateUserPrefernceHandler: jest.fn()
}));

const { getUserHandler, getUsersHandler, createUserHandler, updateUserPrefernceHandler } = require('../handlers/user-handler');

describe('User Routes', () => {
    it('should fetch all users', async () => {
        getUsersHandler.mockResolvedValue([{ id: 1, username: 'testuser' }]);
        const res = await request(app).get('/user/all-users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ id: 1, username: 'testuser' }]);
    });

    it('should fetch user by id', async () => {
        getUserHandler.mockResolvedValue({ id: 1, username: 'testuser' });
        const res = await request(app).get('/user/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ id: 1, username: 'testuser' });
    });

    it('should create a new user', async () => {
        createUserHandler.mockResolvedValue({ id: 1, username: 'testuser' });
        const res = await request(app).post('/user/register').send({
            username: 'testuser',
            email: 'testuser@example.com',
            preferences: ['news'],
            channel: 'email'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ id: 1, username: 'testuser' });
    });

    it('should update user preferences', async () => {
        updateUserPrefernceHandler.mockResolvedValue({ nModified: 1 });
        const res = await request(app).patch('/user/preferences').send({
            email: 'testuser@example.com',
            preferences: ['news'],
            channel: 'email'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ nModified: 1 });
    });
});
