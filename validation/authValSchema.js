
const Joi = require("joi")

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const updateProfileSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    bio: Joi.string().max(500).optional(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional(),
    email: Joi.string().email().optional(),
    isPublic: Joi.boolean().optional(),
})

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
}
