const ApiError = require("../utils/errors/ApiError.js");
const InvalidCredentials = require("../utils/errors/InvalidCredentials.js");
const {promisify} = require("util");
const status = require('http-status');
const bcrypt = require("bcrypt");
const employeeRepository = require("../repositories/employee.repository.js");
 
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const emailService = require("./emailServiceSendGrid.js");
const generator = require('generate-password');
exports.generateToken = function generateToken(userId) {
 
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn:'2 days'});
    return token;
 }
exports.generateRandom = function() {
    return uuidv4();
}

exports.generateRandomPassword = function() {
      const password = generator.generate({
         length: 8,
         numbers: true,
         
      });
      return password;
}
exports.generateOTP = function () {
    var token = crypto.randomBytes(4).toString("hex");
    // var salt = crypto.randomBytes(4).toString("hex");
 
    // const hashedToken = crypto.createHash("sha256").update(salt).digest("hex");
    return token;
}
 exports.hashPassword = function hashPassword(password) {
    const salt = bcrypt.genSaltSync(13);
    const hashedPw = bcrypt.hashSync(password, salt)
    return hashedPw;
}

exports.verifyPassword = (plainPassword, hashedPw) => bcrypt.compareSync(plainPassword, hashedPw);
 
exports.localAuthenticate = async({email ,password} = {}) => {
   
    if (!email || !password) throw new InvalidCredentials();
  
    const user = await employeeRepository.getEmployeeBy({email});
    if (!user) throw new InvalidCredentials();
 
    if (!this.verifyPassword(password, user.password)) throw new InvalidCredentials();
    if (!user.isActive) throw new ApiError(status.FORBIDDEN, "Your Account is not activated yet..");
    const token = this.generateToken(user.id);
    return {
        id:user.id,
        token
    }
 }


 exports.verifyJWT = async (token) => {
    const tokenVeri = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 
    const user = await employeeRepository.getEmployeeBy({id:tokenVeri.id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Something went wrong..");
    if (tokenVeri.iat  < parseInt(user.passwordUpdatedAt/1000,10)) { throw new InvalidCredentials();}
    user.password = "";
    return {tokenData:tokenVeri, user};
 }



 exports.requestPasswordReset  = async(email) => {
    const user = await employeeRepository.getEmployeeBy({email});
    if (!user) throw new ApiError(status.OK, "A Verification Token will be sent to your mail....");
    const oldToken = await employeeRepository.getTokenBy({userId:user.id});
    if (oldToken) {
     const deletedToken = await employeeRepository.deleteTokenByUserId(user.id);
     if (!deletedToken) throw new ApiError(status.INTERNAL_SERVER_ERROR, "Unexpected error please try again later..");
    }
    const token = this.generateOTP();
    const newToken = await employeeRepository.createToken(user.id,token);
    if (!newToken) throw new ApiError(status.INTERNAL_SERVER_ERROR, "Unexpected error please try again later..");
    //Send Email Here
   
    emailService.emailPasswordResetInstructions(email,user.firstName + " " + user.lastName,newToken.token);
    
    if (process.env.NODE_ENV == "development") {
    return token//for test
    } else {
      return true;
    }
    // return true;

    
 }

 exports.resetPassword = async(token, newPassword) => {
    //Check if user has a token
    const registeredToken = await employeeRepository.getTokenBy({token});
    
    if (!registeredToken) throw new ApiError(status.BAD_REQUEST, "Unexpected error please try again later...");
    
    //Check if token not expired
    const tokenAgeInMs = Date.now() - new Date(registeredToken.createdAt).getTime();
    const tenMinutesInMilliseconds = 10 * 60 * 1000;
    if (tokenAgeInMs > tenMinutesInMilliseconds) {
      throw new ApiError(status.BAD_REQUEST, "Token has been expired..");
    }
 
    // //update password
    const updatedUser = await employeeRepository.updateEmployee(registeredToken.userId, {password: this.hashPassword(newPassword), passwordUpdatedAt:new Date() });
  
    const jwToken = this.generateToken(updatedUser.id);
    // //Delete the token   
    const deletedToken = await employeeRepository.deleteTokenByUserId(updatedUser.id);
    return {
        token:jwToken,
        userId:updatedUser.id
    };
 }

 exports.verifyOTP = async(token, email) => {
    //This end point is responsible for verifying the token
    const registeredToken = await employeeRepository.getTokenBy({token});
    if (!registeredToken) throw new ApiError(status.BAD_REQUEST, "Unexpected error please try again later...");
    const user = await employeeRepository.getEmployeeBy({id:registeredToken.employeeId});
    if (user.email != email) throw new ApiError(status.BAD_REQUEST, "Unexpected error please try again later...");
    return true;
 }

 
 exports.changePassword = async (id, oldPassword,newPassword) => {
    //CHECK 
      //Should i validate here that the admin is the one who activating? or this is a middleware responsibility?! 
    const user = await employeeRepository.getEmployeeBy({id});
    if (!user) throw new ApiError(status.BAD_REQUEST, "Please enter correct id...");
    const result = await this.verifyPassword(oldPassword, user.password);
    if (!result) throw new InvalidCredentials() //CHECK I think here we need to revoke the jwt!?
    const updatePassword = await employeeRepository.updateEmployee(user.id, {password: this.hashPassword(newPassword), passwordUpdatedAt:new Date() })
    const token = this.generateToken(user.id);
    return {token}
 }