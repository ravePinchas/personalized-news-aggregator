const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Middleware
app.use(express.json());

// MongoDB connection setup
let db;
console.log('MongoDB URL:', MONGO_URL);


MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('user-service-db');

        // Routes
        app.get('/users', async (req, res) => {
            try {
                const users = await db.collection('users').find().toArray();
                res.json(users);
            } catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Error fetching users' });
            }
        });

        // Other routes (e.g., create user, update user) can be added here

        // Start the server
        app.listen(PORT, () => {
            console.log(`User Service is running on port ${PORT}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
