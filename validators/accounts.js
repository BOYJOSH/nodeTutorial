import Joi from "joi";

export const createBankSchema = Joi.object({
        accountType: Joi.string().required(),
        bankName: Joi.string().required(),
        currency: Joi.string().required().min(3)
    });