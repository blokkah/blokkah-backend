const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync.js');
const ApiError = require('../utils/errors/ApiError.js');
const userAuthenticationService = require("../services/userAuthentication.service.js")

const superAdminService = require("../modules/superAdmin/superAdmin.service.js")

const employeeAuthenticationService = require("../services/employeeAuthentication.service.js");
const InvalidCredentials = require('../utils/errors/InvalidCredentials.js');



exports.isUserAuthenticated = catchAsync(async (req,res,next) => {
    
});



exports.isEmployeeAuthenticated = catchAsync(async(req,res,next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
       const token = req.headers.authorization.split(' ')[1];
       const authenticatedUser = await employeeAuthenticationService.verifyJWT(token);
       req.user = authenticatedUser.user;
       const roles = await superAdminService.getEmployeeRoles(req.user.id);
       const rolesName = roles.map(v => {
        return v.role.name
       })
       req.user.roles = rolesName;
       
       next();

   }  else {
    return next (new ApiError(httpStatus.BAD_REQUEST, "Please Sign in to access this feature.."));
   }
 
  
});

exports.localLogin = catchAsync(async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) return next(InvalidCredentials);
    const signature = await employeeAuthenticationService.localAuthenticate({email,password});
    const token = signature.token;
    res.status(httpStatus.OK).json({
        message:"sucess",
        token
    })
}) 


exports.requestResetPassword = catchAsync(async (req,res,next) => {
const email = req.body.email;
if (!email) return next(new ApiError(httpStatus.BAD_REQUEST, "Please entter your email address"));
const reqReset = await employeeAuthenticationService.requestPasswordReset(email);
res.status(httpStatus.OK).json({
    message:"A token will be sent to your email address..."
})

});

exports.verifyResetToken = catchAsync(async (req,res,next) => {
    const email = req.body.email;
    const token = req.body.token;
    if (!token) return next(new ApiError(httpStatus.BAD_REQUEST), "Please enter your token");
    if (!email) return next(new ApiError(httpStatus.BAD_REQUEST, "Please entter your email address"));
    const isTokenValid = await employeeAuthenticationService.verifyOTP(token,email);
    if (!isTokenValid) return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter correct token"));
    res.status(httpStatus.OK).json({
        message:"success"
    })
    
    });

    exports.resetPassword = catchAsync(async (req,res,next) => {
        const newPassword = req.body.password;
        const token = req.body.token;
        if (!token || !newPassword) return next(new ApiError(httpStatus.BAD_REQUEST, "Unexpected error please try again later..."));
        const result = await employeeAuthenticationService.resetPassword(token, newPassword);
        res.status(httpStatus.OK).json({
            message:"your password is changed sucessfully",
            token:result.token
        })
        
        });

        exports.changePassword = catchAsync(async (req,res,next) => {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
           
            const id = req.body.id;
            if (!oldPassword || !newPassword) return next(new ApiError(httpStatus.BAD_REQUEST, "Please enter your old and new password"));
            const result = await employeeAuthenticationService.changePassword(id,oldPassword,newPassword);
         
            res.status(httpStatus.OK).json({
                message:"your password is changed sucessfully",
                token:result.token
               
            })
            
            });