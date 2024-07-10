// user-service/routes/userRoutes.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
let db;

MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('user-service-db');
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

// GET /user/:id - Fetch user details by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

module.exports = router;
