const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync.js');
const ApiError = require('../utils/errors/ApiError.js');
const AuthroizationService = require("../services/authroization.service.js");

  module.exports = function (role, action, resource,own,fields) {

    return catchAsync(async function(req,res,next) {
    
        const result =  await AuthroizationService.checkAccess(role, action, resource,own,fields) 
        if (result) next();
    });
 }