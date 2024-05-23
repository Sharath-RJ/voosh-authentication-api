const Joi = require("joi")


const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
})


const validateUserRegister = (req, res, next) => {
    const { error } = userRegisterSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error })
    }
    next()
}

module.exports = validateUserRegister
