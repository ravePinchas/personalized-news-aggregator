const express = require('express');
const { getUserController, getUsersController, createUserController, updateUserController } = require('../controllers/user-controller');
const { validateCreateUser, validateUpdateUser } = require('../validators/user-validator');
const router = express.Router();

router.get('/all-users', getUsersController);

// GET /user/:id - Fetch user details by id
router.get('/:id', getUserController);

router.post('/register', validateCreateUser, createUserController);

router.patch('/preferences', validateUpdateUser, updateUserController);

module.exports = router;
