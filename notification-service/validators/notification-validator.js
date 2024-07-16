const Joi = require('joi');

const sendEmailSchema = Joi.object({
    email: Joi.string().email().required(),
    newsContent: Joi.string().required()
});

const sendTelegramSchema = Joi.object({
    chat_id: Joi.string().required(),
    text: Joi.string().required()
});

const validateSendEmail = (req, res, next) => {
    const { error } = sendEmailSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateSendTelegram = (req, res, next) => {
    const { error } = sendTelegramSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateSendEmail,
    validateSendTelegram
};
