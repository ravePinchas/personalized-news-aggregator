const Joi = require('joi');

const createUserSchema = Joi.object({
    preferences: Joi.array().items(Joi.string()).required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    channel: Joi.string().required()
});

const updateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    preferences: Joi.array().items(Joi.string()).optional(),
    channel: Joi.string().optional()
});

const validateCreateUser = (req, res, next) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateUpdateUser = (req, res, next) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCreateUser,
    validateUpdateUser
};
