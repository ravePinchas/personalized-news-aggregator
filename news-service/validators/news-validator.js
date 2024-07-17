const Joi = require('joi');

const fetchNewsSchema = Joi.object({
    preferences: Joi.array().items(Joi.string()).min(1).required()
});

const validateFetchNews = (data) => {
    return fetchNewsSchema.validate(data);
};

module.exports = {
    validateFetchNews
};
