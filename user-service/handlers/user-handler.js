const fetch = require('node-fetch');

const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || 3500;
const DAPR_STATE_STORE_NAME = process.env.DAPR_STATE_STORE_NAME || 'statestore';

const daprUrl = `http://localhost:${DAPR_HTTP_PORT}/v1.0/state/${DAPR_STATE_STORE_NAME}`;

const getUserHandler = async (id) => {
    const response = await fetch(`${daprUrl}/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}

const getUsersHandler = async () => {
    const response = await fetch(daprUrl);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
}

const createUserHandler = async (newUser) => {
    const user = await getUserHandler(newUser.email);
    if (!user) {
        const response = await fetch(daprUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{ key: newUser.email, value: newUser }])
        });
        if (response.ok) {
            return newUser;
        } else {
            throw new Error('Error creating user');
        }
    } else {
        throw new Error('Email already taken');
    }
}

const updateUserPreferenceHandler = async (userEmail, newPreferences, channel) => {
    const updateObj = newPreferences ? { preferences: newPreferences } : { channel };
    const response = await fetch(daprUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ key: userEmail, value: updateObj }])
    });
    if (response.ok) {
        return updateObj;
    } else {
        throw new Error('Error updating user');
    }
}

module.exports = {
    getUserHandler,
    getUsersHandler,
    createUserHandler,
    updateUserPreferenceHandler
}
