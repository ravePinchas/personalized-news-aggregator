const express = require('express');
const { getUserController, getUsersController, createUserController, updateUserController } = require('../controllers/user-controller');
const router = express.Router();

router.get('/all-users', getUsersController);

// GET /user/:id - Fetch user details by id
router.get('/:id', getUserController);

router.post('/register', createUserController);

router.patch('/preferences', updateUserController);

module.exports = router;
