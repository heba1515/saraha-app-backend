import joi from 'joi';


export const registerValidationSchema = joi.object({
    // name: joi.string().min(3).required(),
    // email: joi.string().email({minDomainSegments: 2, tlds: ['com','eg'] }).required(),
    // password: joi.string().pattern(new RegExp(/^[A-Z][a-z0-9@#$&*]{3,10}$/)).required(),
    // confirmedPassword: joi.string().valid(joi.ref('password')).required()
}).options({allowUnknown: false})


export const loginValidationSchema = joi.object({
    email: joi.string().email({minDomainSegments: 2, tlds: ['com','eg'] }).required(),
    password: joi.string().pattern(new RegExp(/^[A-Z][a-z0-9@#$&*]{1,}$/)).required(),
}).options({allowUnknown: false})