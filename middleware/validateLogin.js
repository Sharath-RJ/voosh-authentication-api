const Joi = require("joi")

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})


const validateUserLogin = (req, res, next) => {
    const { error } = userLoginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}
module.exports = validateUserLogin
