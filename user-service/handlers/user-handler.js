const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config(); // Ensure this line is present to load environment variables

const MONGO_URL = process.env.MONGO_URL;

let db;

MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('user-service-db');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if connection fails
    });

const getUserHandler = async (id) => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });
    return user;
};

const getUsersHandler = async () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    const users = await db.collection('users').find().toArray();
    return users;
};

const createUserHandler = async (newUser) => {
    if (!db) {
        throw new Error('Database not initialized');
    }

    const user = await db
        .collection('users')
        .findOne({ email: newUser.email });

    if (!user) {
        const createdUser = await db
            .collection('users')
            .insertOne(newUser);
        return createdUser;
    } else {
        throw new Error('Email already taken');
    }
};

const updateUserPrefernceHandler = async (userEmail, newPreferences, channel) => {
    if (!db) {
        throw new Error('Database not initialized');
    }

    const updateObj = newPreferences ? { preferences: newPreferences } : { channel };
    const updatedUser = await db
        .collection('users')
        .updateOne({ email: userEmail }, { $set: updateObj });
    return updatedUser;
};

module.exports = {
    getUserHandler,
    getUsersHandler,
    createUserHandler,
    updateUserPrefernceHandler
};
