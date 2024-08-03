
const Joi = require("joi")
exports.createUser = {
    body:Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/).required().messages({
          'string.pattern.base': 'Please enter a correct phone number'
        }),
        password: Joi.string().min(9).required().messages({
          'string.min': 'Password must be more than 8 characters'
        }),
        country: Joi.string().when('roleName', {
          is: Joi.string().valid('agent', 'agency'),
          then: Joi.valid('saudi-arabia').required().messages({
            'any.only': 'Country must be Saudi Arabia for agents and agencies.',
            'any.required': 'Country is required for agents and agencies.'
          }),
          otherwise: Joi.required()
        }),
        roleName: Joi.string().valid('customer', 'agent', 'agency').required(),
        falLicense: Joi.string().when('roleName', { is: Joi.string().valid('agent', 'agency'), then: Joi.required() }).messages({
          'any.required': 'Licence is required for agents.'
        }),
        city: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
      }),
      query : Joi.object({
        refLink:Joi.string()
      })    
}

/*
exports.localCreateUser = {
    body:Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/).required().messages({
          'string.pattern.base': 'Please enter a correct phone number'
        }),
        password: Joi.string().min(9).required().messages({
          'string.min': 'Password must be more than 8 characters'
        }),
        country: Joi.string().valid('saudi-arabia').required(),
        isVerified: Joi.boolean().default(false),
        isLocal: Joi.boolean().required(),
        isFacebook: Joi.boolean(),
        isApple: Joi.boolean(),
        googleId: Joi.string().when('isFacebook', { is: true, then: Joi.required() }).messages({
          'any.required': 'Facebook sign in failed.'
        }),
        appleId: Joi.string().when('isApple', { is: true, then: Joi.required() }).messages({
          'any.required': 'Apple sign in failed.'
        }),
        role: Joi.string().valid('customer', 'agent', 'admin', 'agency').required(),
        licence: Joi.string().when('role', { is: Joi.string().valid('agent', 'agency'), then: Joi.required() }).messages({
          'any.required': 'Licence is required for agents.'
        }),
        city: Joi.string(),
        lastAccess: Joi.date().default(() => new Date(), 'current date'),
        dateOfBirth: Joi.date().required(),
        passwordUpdatedAt: Joi.date(),
        referralCode: Joi.string().required(),
        referrerId: Joi.number()
      })
    

}


*/