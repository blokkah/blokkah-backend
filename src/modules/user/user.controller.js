const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync.js');
const ApiError = require('../../utils/errors/ApiError.js');
const InvalidCredentialsError = require('../../utils/errors/InvalidCredentials.js');
const userService = require("./user.service.js")
 
const { http } = require('winston');

exports.getAllAgents = catchAsync(async (req,res,next) => {
    
    const limit = req.query.limit;
    const page = req.query.page;
 
    const agents = await userService.getAllAgents(limit,page);
    res.status(httpStatus.OK).json({
        data:agents
    })
});
exports.getPendingAgents = catchAsync(async (req,res,next) => {
    
    const limit = req.query.limit;
    const page = req.query.page;
 
    const agents = await userService.getAllAgents(limit,page, {isPending:true});
    res.status(httpStatus.OK).json({
        data:agents
    })
});
exports.getAcceptedAgents = catchAsync(async (req,res,next) => {
    
    const limit = req.query.limit;
    const page = req.query.page;
 
    const agents = await userService.getAllAgents(limit,page, {isVerified:true});
    res.status(httpStatus.OK).json({
        data:agents
    })
});
exports.getRejectedAgents = catchAsync(async (req,res,next) => {
    
    const limit = req.query.limit;
    const page = req.query.page;
 
    const agents = await userService.getAllAgents(limit,page, {isPending:false, isVerified:false});
    res.status(httpStatus.OK).json({
        data:agents
    })
});
exports.getAllCustomers = catchAsync(async (req,res,next) => {
    
    const limit = req.query.limit;
    const page = req.query.page;
 
    const customers = await userService.getAllCustomers(limit,page);
    res.status(httpStatus.OK).json({
        data:customers
    })
});

exports.activateUser = catchAsync(async (req,res,next) => {
    if (!req.body.userId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter user id.."));
    }
    const userId = req.body.userId;
    const activatedUser = await userService.activateUser(userId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })
    
});

exports.deActivateUser = catchAsync(async (req,res,next) => {
    if (!req.body.userId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter user id.."));
    }
    const userId = req.body.userId;
    const activatedUser = await userService.deActivateUser(userId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })
    
});

exports.verifyAgent = catchAsync(async(req,res,next) => {
    const agentId = req.body.agentId;
    if (!agentId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter agent id.."));
    }
 
    const verifiedAgent = await userService.verifyAgent(agentId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })

});

exports.rejectAgent = catchAsync(async(req,res,next) => {

    const agentId = req.body.agentId;
    if (!agentId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter agent id.."));
    }
 
    const verifiedAgent = await userService.rejectAgent(agentId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })
});