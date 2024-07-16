const Joi = require('joi');

const fetchNewsSchema = Joi.object({
    preferences: Joi.string().required()
});

const validateFetchNews = (req, res, next) => {
    const { error } = fetchNewsSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateFetchNews
};
