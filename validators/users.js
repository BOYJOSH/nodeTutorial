import joi from "joi";

export const loginUserSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()   // ← add ()
});


export const sigupUserSchema = joi.object({
    id: joi.number().required,
    name: joi.string().required,
    email: joi.string().required(),
    password: joi.string().required
});