const {MongoClient, ObjectId } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
let db;

MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db('user-service-db');
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

const getUserHandler = async (id) => {
    const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });
    return user;
};

const getUsersHandler = async () => {
    const users = await db.collection('users').find().toArray();
    return users;
};

const createUserHandler = async(newUser) => {
    const user = await db.collection('users').findOne({email: newUser.email});

    if(!user) {
        const createdUser = await db.collection('users').insert(newUser);
        return createdUser;
    } else {
        throw new Error("Email already is taken");
    }
};

const updateUserPrefernceHandler = async(userEmail, newPreferneces, channel) => {
    const updateObj = newPreferneces ? {preferences: newPreferneces} : {channel};
    const updatedUser = await db
        .collection('users')
        .updateOne({email: userEmail}, {$set: updateObj});
    return updatedUser;
};

module.exports = {
    getUserHandler,
    getUsersHandler,
    createUserHandler,
    updateUserPrefernceHandler
};
