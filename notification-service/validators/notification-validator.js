const Joi = require('joi');

const sendEmailSchema = Joi.object({
    email: Joi.string().email().required(),
    newsContent: Joi.string().required()
});

const sendTelegramSchema = Joi.object({
    chat_id: Joi.string().required(),
    text: Joi.string().required()
});

const validateSendEmail = (data) => {
    return sendEmailSchema.validate(data);
};

const validateSendTelegram = (data) => {
    return sendTelegramSchema.validate(data);
};

module.exports = {
    validateSendEmail,
    validateSendTelegram
};
