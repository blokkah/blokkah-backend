
const Joi = require("joi")
const schema = Joi.object({
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
  });


  function TestClassicScenarios() {

  //Test Country Must be Saudi Arabia for agents and agencies
  const x = schema.validate({  
    "firstName": "Mostafa",
    "lastName": "Ahmed",
    "userName": "Mostafa",
    "email": "admin@example.com",
    "phoneNumber": "966514139610",
    "password": "sasa123456",
    "country": "pakastan",
    "roleName": "customer",
    "city": "New York",
    "falLicense":"licence",
    "dateOfBirth":"1990-01-01"
  })
    console.log(x);



  }

  TestClassicScenarios();