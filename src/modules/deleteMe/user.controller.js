const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync.js');
const ApiError = require('../../utils/errors/ApiError.js');
const InvalidCredentialsError = require('../../utils/errors/InvalidCredentials.js');
const userService = require("./user.service.js")
const AuthenticationService = require("../../services/userAuthentication.service.js")

exports.createUser = catchAsync(async (req,res,next) => {
    const refLink  = req.query.refLink ? req.query.refLink : undefined;
    const newUser = await userService.createUser(req.body, refLink);

 
});


exports.protectRoute = catchAsync(async (req, res, next) => {
 const token = req.body.accessToken;
 if (!token) return next(new ApiError(httpStatus.BAD_REQUEST, "Please Sign In Again.."));
 const verifiedToken = await AuthenticationService.verifyJWT(token);
 if (!verifiedToken) return next(new ApiError(httpStatus.BAD_REQUEST, "Please Sign In Again.."));
 //CHECK i won't call the repistory so i don't violate the 3 tier principles! let the service do it for us
 const verifiedUser = await AuthenticationService.isPasswordActive(verifiedToken.iat);
 req.user = verifiedUser;
 if (isTokenValid) next();


});