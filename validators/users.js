import joi from "joi";

export const loginUserSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()   // ← add ()
});

export const transferSchema = joi.object({
    amount: joi.number().required(),
    fromAccount: joi.string().min(10).max(10).required(),
    toAccount: joi.string().min(10).max(10).required()
});

export const sigupUserSchema = joi.object({
     firstName: joi.number().required,
     lastName: joi.string().required,
     email: joi.string().required(),
     password: joi.string().min(11).required,
    phoneNumber: joi.string().required().min(7)
});