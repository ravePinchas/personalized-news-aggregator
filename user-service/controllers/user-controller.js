const { getUserHandler, getUsersHandler, createUserHandler, updateUserPrefernceHandler } = require("../handlers/user-handler");

const getUserController = async(req, res)=> {
    try{
        const { id } = req.params;
        const user = await getUserHandler(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUsersController = async(req, res)=> {
    try {
        const users = await getUsersHandler();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUserController = async(req, res) => {
    try{
        if(!(req.body.preferences && req.body.username && req.body.email && req.body.channel)){
            res.status(400).json({ message: 'request body incorrect' });
        }
        const createdUser = await createUserHandler(req.body); //need to do validation
        res.status(201).json(createdUser);
    }catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update single field
const updateUserController = async(req, res) => {
    try{
        const {email, preferences, channel} = req.body;
        const updatedUser = await updateUserPrefernceHandler(email, preferences, channel); //need to do validation
        res.status(200).json(updatedUser);
    }catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getUserController,
    getUsersController,
    createUserController,
    updateUserController
};
