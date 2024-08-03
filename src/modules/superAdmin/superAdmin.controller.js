const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/errors/ApiError.js');
const InvalidCredentialsError = require('../../utils/errors/InvalidCredentials.js');
const superAdminService = require("./superAdmin.service.js")
const AuthenticationService = require("../../services/employeeAuthentication.service.js");
const { http } = require('winston');

exports.getAllEmployees = catchAsync(async (req,res,next) => {
    const limit = req.query.limit;
    const page = req.query.page;
 
    const employees = await superAdminService.getAllEmployeesWithRoles();
    res.status(httpStatus.OK).json({
        data:employees
    })
});

exports.activateEmployee = catchAsync(async (req,res,next) => {
    if (!req.body.employeeId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter employee id.."));
    }
    const employeeId = req.body.employeeId;
    const activatedEmployee = await superAdminService.activateEmployee(employeeId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })
    
});

exports.deActivateEmployee = catchAsync(async (req,res,next) => {
    if (!req.body.employeeId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter employee id.."));
    }
    const employeeId = req.body.employeeId;
    const activatedEmployee = await superAdminService.deActivateEmployee(employeeId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })
    
});

exports.deleteEmployee = catchAsync(async (req,res,next) => {
    if (!req.body.employeeId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter employee id.."));
    }
    const employeeId = req.body.employeeId;
    const activatedEmployee = await superAdminService.deleteEmployee(employeeId);
    res.status(httpStatus.OK).json({
        messag:"success"
    })
    
});

exports.createEmployee = catchAsync(async (req,res,next) => {
    const employeeData = req.body;
    const employee = await superAdminService.createEmployee(employeeData);
    res.status(httpStatus.OK).json({
        message:"success",
        id:employee.user.id,
        password:employee.password
    })

});

exports.updateEmployee = catchAsync(async (req,res,next) => {
    const id = req.params.id;
    const employeeData = req.body;
    if (!id) return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter user id..."));
    const employee = await superAdminService.updateEmployee(id, employeeData);
    res.status(httpStatus.OK).json({
        message:"success"
    })

})